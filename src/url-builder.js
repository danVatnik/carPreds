
const URLBuilder = {
    addQueryParams(baseURL, params) {
        const query = this.buildQuery(params);
        if(query != ""){
            return(`${baseURL}${query}`);
        }  
        return(baseURL); 
    },

    buildQuery(params){
        let c = "";
        
        if(params == null || params == undefined)
            return(c);

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
        if(Array.isArray(value)){
            value = value.map((v, i) => {if(i > 0){return(`,${v}`)}else{return(v)}})
        }
        return(`${key}=${value}`)
    }
}

export default URLBuilder;