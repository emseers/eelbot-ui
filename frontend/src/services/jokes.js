const getPage = async (numJokesPerPage, page) => {
    const response = await fetch(`/joke/?num_jokes_per_page=${numJokesPerPage}&page=${page}`);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const body = await response.json();
    console.log(body)
    return body;
};

const get = async (id) => {
    const response = await fetch(`/joke/${id}`);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const body = await response.json();
    return body.data;
};

export default {
    getPage,
    get,
};