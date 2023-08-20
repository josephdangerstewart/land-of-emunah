import { DataSheet } from './types';
import { google } from 'googleapis';
import { getRange } from './sheetsUtil';

export async function clearSheetData<T extends Record<string, string>>(
	sheet: DataSheet<T>
): Promise<void> {
	const sheetsClient = google.sheets({ version: 'v4' });

	await sheetsClient.spreadsheets.values.clear({
		spreadsheetId: sheet.spreadsheetId,
		range: getRange(sheet, 1),
	});
}
