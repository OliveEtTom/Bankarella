import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Meta { longName: string; }
interface Quote { open: (number | null)[]; high: (number | null)[]; low: (number | null)[]; close: (number | null)[]; volume: (number | null)[]; }
interface Result { meta: Meta; timestamp: number[]; indicators: { quote: Quote[] }; }
interface YahooChartResponse { chart: { result: Result[] } }
export interface RecordItem { date: Date; open: number | null; high: number | null; low: number | null; close: number | null; volume: number | null; }

@Injectable({ providedIn: 'root' })
export class Cac40Service {
    constructor(private http: HttpClient) { }

    getHistory(): Observable<RecordItem[]> {
        const url = '/api/v8/finance/chart/%5EFCHI?range=1y&interval=1mo';

        const response = this.http.get<YahooChartResponse>(url);
        response.subscribe({
            next: data => {
                console.log('Success:', data);
            },
            error: err => {
                console.error('Error:', err);
            }
        });
        return response.pipe(
            map(resp => {
                const result = resp.chart.result[0];
                const longName = result.meta.longName;
                console.log(`Fetched data for ${longName}`);
                const timestamps = result.timestamp || [];
                const quote = result.indicators.quote[0];
                return timestamps.map((timestamp, i) => ({
                    date: new Date(timestamp * 1000),
                    open: quote.open?.[i] ?? null,
                    high: quote.high?.[i] ?? null,
                    low: quote.low?.[i] ?? null,
                    close: quote.close?.[i] ?? null,
                    volume: quote.volume?.[i] ?? null,
                }));
            })
        );
    }
}