import { createFetchClient } from "@zayne-labs/callapi";

import { assertENV } from "@zayne-labs/toolkit/type-helpers";

const BACKEND_URL = assertENV(
	process.env.NEXT_PUBLIC_BACKEND_URL,
	"NEXT_PUBLIC_BACKEND_URL env does not exist"
);

const callBackendApi = createFetchClient({
	baseURL: BACKEND_URL,
	dedupeStrategy: "cancel",
	credentials: "include",
});

export { callBackendApi };
