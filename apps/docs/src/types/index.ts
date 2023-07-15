export type ComponentPackageJson = {
	description?: string;
	displayName?: string;
	filePath?: string;
	props: {
		defaultValue?: string;
		description?: string;
		name?: string;
		required?: boolean;
		type?: string;
	}[];
	status: string;
};
