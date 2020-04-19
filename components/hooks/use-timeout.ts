import { useEffect, useRef } from 'react';

export function useTimeout(cb: () => void, timeout: number): void {
	const ref = useRef<number>();
	
	useEffect(() => {
		ref.current = setTimeout(cb, timeout);
		return () => clearTimeout(ref.current);
	}, []);
}
