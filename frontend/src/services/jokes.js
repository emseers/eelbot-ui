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

    const joke = await response.json();
    return joke;
};

const del = async (id) => {
    const settings = {
        method: 'DELETE',
    }

    const response = await fetch(`/joke/${id}`, settings);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const success = await response.ok;
    return success;
};

const create = async (joke) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke)
    };
    
    const response = await fetch('/joke', settings);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    };

    const success = await response.ok;
    return success;
};

const put = async (id, joke) => {
    const settings = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke)
    };
    
    const response = await fetch(`/joke/${id}`, settings);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    };

    const success = await response.ok;
    return success;
};

export default {
    getPage,
    get,
    del,
    create,
    put,
};