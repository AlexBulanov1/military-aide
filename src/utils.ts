// Just mock function to check if email is admin's email
export const isAdminEmail = (email: string, organizationName: string) => {
	return email.includes('admin') && email.includes(organizationName);
};
export const PHONE_NUMBER_REGEXP =
	/^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\d{3}\d{2}\d{2}$/;

export const getFormattedDate = () => {
	return new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
};
