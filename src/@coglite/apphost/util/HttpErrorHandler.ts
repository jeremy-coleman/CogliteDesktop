const handleAxiosError = (error) => {
    if (error.response && error.response.status === 504) {
        throw {
            message: "Request Timed Out",
            description: "The server is currently not responding. If the problem persists, please contact CIE.ICP@border.gov.au with a description of the problem."
        }
    }
    throw error;
};
export { handleAxiosError }