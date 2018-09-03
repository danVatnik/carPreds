
const URLBuilder = {
    addQueryParams(baseURL, params) {
        const query = this.buildQuery(params);
        if(query != ""){
            return(`${baseURL}?${query}`);
        }  
        return(baseURL); 
    },

    buildQuery(params){
        let c = "";
        Object.keys(params).forEach((key, i) => {
            if(i > 0){
                c = `${c}&${this.formatParam(key, params[key])}`;
            }
            else{
                c = `${c}${this.formatParam(key, params[key])}`;
            }
        });
        return(c);
    },

    formatParam(key, value){
        return(`${key}=${value}`)
    }
}

module.exports = URLBuilder;