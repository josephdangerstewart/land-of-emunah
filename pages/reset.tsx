import React, { useEffect } from 'react';
import { usePastEncounters } from '../components/hooks/use-past-encounters';
import { Head } from '../components/head';
import { useRouter } from 'next/router';

export default function Reset() {
	const { clearEncounters } = usePastEncounters();
	const router = useRouter();

	useEffect(() => {
		clearEncounters();
		router.push('/');
	}, []);
	
	return (
		<Head />
	);
}
