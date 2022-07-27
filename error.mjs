export const parse = (error) => {
    console.log(error);
    const { message, response, status } = error;
    return {
        error: (
            message ||
            response?.message ||
            status || 
            response?.status
        ),
    };
};
