// Just mock function to check if email is admin's email
export const isAdminEmail = (email: string, organizationName: string) => {
	return email.includes('admin') && email.includes(organizationName);
};
