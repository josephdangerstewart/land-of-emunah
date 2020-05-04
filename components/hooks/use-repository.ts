import { useCancelableFetch } from './use-cancelable-fetch';
import { ILocationRepository } from '../../types/ILocationRepository';
import { useMemo } from 'react';
import { ClientLocationRepository } from '../../api/client/ClientLocationRepository';
import { IEncounterRepository } from '../../types/IEncounterRepository';
import { ClientEncounterRepository } from '../../api/client/ClientEncounterRepository';
import { IPromptRepository } from '../../types/IPromptRepository';
import { ClientPromptRepository } from '../../api/client/ClientPromptRepository';

export function useClientLocationRepository(): ILocationRepository {
	const { fetchJson } = useCancelableFetch();
	return useMemo(() => new ClientLocationRepository({ fetchJson }),[fetchJson]);
}

export function useClientEncounterRepository(): IEncounterRepository {
	const { fetchJson } = useCancelableFetch();
	return useMemo(() => new ClientEncounterRepository({ fetchJson }), [fetchJson]);
}

export function useClientPromptRepository(): IPromptRepository {
	const { fetchJson, postJson, postForm } = useCancelableFetch();
	return useMemo(() => new ClientPromptRepository({ fetchJson, postForm, postJson }), [
		fetchJson,
		postJson,
		postForm,
	]);
}
