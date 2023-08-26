import { useEffect, useRef, useCallback } from 'react';
import {
	fetchJson,
	postJson,
	postForm,
} from '../../api/client/client-utility';

interface CancelablePromise<T> extends Promise<T> {
	cancel: () => void;
}

interface UseCancelableFetchHook {
	fetchJson: (url: string) => CancelablePromise<any>;
	postJson: (url: string, body: any) => CancelablePromise<any>;
	postForm: (url: string, body: FormData) => CancelablePromise<any>;
	cancelAll: () => void;
}

function makeCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
	let cancel = () => null;

	const cancelPromise = new Promise<T>((resolve, reject) => {
		cancel = () => reject({ isCanceled: true });
	});

	const wrapperPromise = Promise.race([
		cancelPromise,
		promise,
	]) as any;

	wrapperPromise.cancel = cancel;
	return wrapperPromise as CancelablePromise<T>;
}

export function useCancelableFetch(): UseCancelableFetchHook {
	const promises = useRef<CancelablePromise<any>[]>([]);

	const cancelableFetchJson = useCallback(
		(url: string) => {
			const promise = makeCancelable(fetchJson(url));
			promises.current.push(promise);
			return promise;
		},
		[]
	);

	const cancelablePostJson = useCallback(
		(url: string, data: any) => {
			const promise = makeCancelable(postJson(url, data));
			promises.current.push(promise);
			return promise;
		},
		[]
	);

	const cancelablePostForm = useCallback(
		(url: string, data: FormData) => {
			const promise = makeCancelable(postForm(url, data));
			promises.current.push(promise);
			return promise;
		},
		[]
	);

	const cancelAll = useCallback(() => {
		promises.current.forEach(p => p.cancel());
	}, []);

	useEffect(() => () => { cancelAll(); }, [cancelAll]);

	return {
		fetchJson: cancelableFetchJson,
		postJson: cancelablePostJson,
		postForm: cancelablePostForm,
		cancelAll,
	};
};
