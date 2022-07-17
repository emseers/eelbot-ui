const getPage = async (numJokesPerPage, page) => {
    const response = await fetch(`/api/joke/?num_jokes_per_page=${numJokesPerPage}&page=${page}`);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.json();
};

const get = async (id) => {
    const response = await fetch(`/api/joke/${id}`);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.json();
};

const del = async (id) => {
    const settings = {
        method: 'DELETE',
    }

    const response = await fetch(`/api/joke/${id}`, settings);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.ok;
};

const create = async (joke) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke)
    };
    
    const response = await fetch('/api/joke', settings);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.ok;
};

const put = async (id, joke) => {
    const settings = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(joke)
    };
    
    const response = await fetch(`/api/joke/${id}`, settings);
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.ok;
};

export default {
    getPage,
    get,
    del,
    create,
    put,
};