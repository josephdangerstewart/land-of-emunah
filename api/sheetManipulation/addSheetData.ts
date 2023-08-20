import { google } from 'googleapis';
import { DataSheet, DataSheetRow, RowOf } from './types';
import { columnNameToIndex, getRange, buildRow } from './sheetsUtil';

export async function addSheetData<T extends Record<string, string>>(
	sheet: DataSheet<T>,
	rowData: T[]
): Promise<void> {
	const sheetsClient = google.sheets({ version: 'v4' });

	const columns = Object.entries(sheet.columns).map(([keyName, columnName]) => ({
		keyName,
		index: columnNameToIndex(sheet, columnName),
	}));

	const rawRowData = rowData.map((x) => buildRow(sheet, x, columns));

	await sheetsClient.spreadsheets.values.append({
		spreadsheetId: sheet.spreadsheetId,
		range: getRange(sheet, 1),
		requestBody: {
			values: rawRowData,
		},
		valueInputOption: 'USER_ENTERED',
	});
}
