export const loggerMiddleWare = (store) => (next) => (action) => {
	if (!action.type) {
		next(action);
	}

	console.log("Action type:", action.type);
	console.log("Action payload:", action.payload);
	console.log("Current State:", store.getState());

	next(action);

	console.log("next State:", store.getState());
};