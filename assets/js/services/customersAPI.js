import axios from "axios";

function findAll() {
    return axios
        .get("http://localhost:8888/api/customers")
        .then(response => response.data['hydra:member']);
}

function deleteCustomer(id) {
    if (id) {
        return axios
            .delete("http://localhost:8888/api/customers/" + id);
    }
}

export default {
    findAll,
    delete: deleteCustomer
}