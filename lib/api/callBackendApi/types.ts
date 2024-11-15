export type SingleTip = {
	imageAlt: string;
	mainTitle: string;
	imageUrl: string;
	lastUpdated: string;
	mainBody: Array<{
		Title: string;
		Description: string;
		Content: string;
	}>;
};

export type TipsResponse = { data: Array<{ id: string; title: string; imageUrl: string }> };

export type Disease = {
	Disease: string;
	Description: string;
	Image: string;
};

export type DiseasesResponse = {
	page: number;
	limit: number;
	totalDiseases: number;
	diseases: Disease[];
};

export type SingleDisease = {
	Disease: string;
	Symptoms: string[];
	Description: string;
	Image: string;
	Precautions: string[];
};
