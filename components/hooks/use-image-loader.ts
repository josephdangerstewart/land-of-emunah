import { useState, useMemo, useEffect } from 'react';

export function useImageLoader(src: string): string {
	const [imageSrc, setImageSrc] = useState(null);

	const image = useMemo(() => typeof Image !== 'undefined' ? new Image() : null, []);

	useEffect(() => {
		if (!image) {
			return;
		}

		image.onload = () => {
			setImageSrc(image.src);
		}

		image.src = src;

		return () => {
			setImageSrc(null);
		}
	}, [src]);

	useEffect(() => () => {
		if (!image) {
			return;
		}

		image.onload = null;
	}, [])

	return imageSrc;
}
