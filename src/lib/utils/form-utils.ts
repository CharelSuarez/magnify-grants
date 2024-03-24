import { FieldType } from '@prisma/client';

export const hasOptions = (type: FieldType) => {
	return (
		type === FieldType.MultipleChoice || type === FieldType.Checkbox || type === FieldType.Dropdown
	);
};
