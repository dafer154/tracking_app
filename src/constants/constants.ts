export const IP = 'http://localhost:4000';
// export const IP = 'https://ec2-52-23-101-151.compute-1.amazonaws.com';
// export const IP = 'https://rflogisticsbesideyou.herokuapp.com';

export const API = `${IP}/api`;

export const Roles = {
    GETALL: `${API}/roles`
}

export const Login = {
    AUTH: `${API}/login`,
    LOGOUT: `${API}/logout`
}

export const Users = {
    GETALL: `${API}/users`,
    CREATENATURAL: `${API}/users/natural`,
    CREATEJURIDICAL: `${API}/users/juridical`,
    CREATETRANSPORTER: `${API}/users/transporter`,
    VALIDATEEMAIL: `${API}/users/validateEmail/`,
    VALIDATEPHONE: `${API}/users/validatePhoneNumber`,
}

export const Service = {
    CREATE: `${API}/services`,
    GETALL: `${API}/services/getAllServicesAdmin/`,
    GETALLACTIVE: `${API}/services/getAllServicesByStatus/`,
    GETADRESS: `${API}/services/getAddressService/`,
    GETBYID: `${API}/services/getById/`,
    UPDATE: `${API}/services`,
    DELETE: `${API}/services/`
}

export const Cities = {
    GETALL: `${API}/cities`
}

export const Vehicles = {
    GETALL: `${API}/vehicles`
}