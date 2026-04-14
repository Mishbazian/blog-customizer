import { FormEvent, useRef, useState } from 'react';

export const useForm = <T>(
	currentParams: T,
	applyParams: (params: T) => void
) => {
	const defaultParams = useRef<T>(currentParams);

	const [selectedParams, setSelectedParams] = useState<T>({
		...defaultParams.current,
	});

	const handleChange = (changedParams: Partial<T>) => {
		setSelectedParams({ ...selectedParams, ...changedParams });
	};

	const handleCancel = () => {
		setSelectedParams({ ...currentParams });
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSelectedParams({ ...defaultParams.current });
		applyParams({ ...defaultParams.current });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyParams({ ...selectedParams });
	};

	return {
		selectedParams,
		handleChange,
		handleCancel,
		handleReset,
		handleSubmit,
	};
};
