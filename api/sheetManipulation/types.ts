export interface DataSheet<T extends Record<string, string>> {
	spreadsheetId: string;
	dataStartsAtRow: number;
	name: string;
	columns: T;
}

export type DataSheetRow<T extends string | number | symbol> = {
	[key in T]: string | undefined;
}

export type RowOf<T extends DataSheet<any>> = T extends DataSheet<infer U> ? U : never;
