import { FormEvent, useEffect, useState } from 'react';

export const useForm = <T>(
	currentParams: T,
	applyParams: (params: T) => void
) => {
	const [initialParams, setInitialParams] = useState<T>(currentParams);

	const [selectedParams, setSelectedParams] = useState<T>({
		...initialParams,
	});

	const handleChange = (changedParams: Partial<T>) => {
		setSelectedParams({ ...selectedParams, ...changedParams });
	};

	const handleCancel = () => {
		setSelectedParams({ ...initialParams });
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSelectedParams(() => ({ ...initialParams }));
		applyParams({ ...initialParams });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ ...selectedParams });
		applyParams({ ...selectedParams });
	};

	useEffect(() => {
		if (initialParams !== currentParams) {
			setInitialParams(currentParams);
		}
	}, [initialParams]);

	return {
		selectedParams,
		handleChange,
		handleCancel,
		handleReset,
		handleSubmit,
	};
};
