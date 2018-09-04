# json library
library('rjson')
 
# function to call
sumFunc <- function (num1, num2){
  sum(num1, num2)
}
 
# get arguments of cli
args <- commandArgs(trailingOnly = TRUE)
 
# arguments to JSON
json <- fromJSON(args)

json <- lapply(json, function(x) {
  x[sapply(x, is.null)] <- NA
  unlist(x)
})

data = data.frame(do.call("rbind", json))
res = lm(price~year+miles + miles*year, data)
# call function
#ret <- sumFunc(as.numeric(json$a),as.numeric(json$b))
 
# convert return of function to list
output <- list(result = res$coefficients)
 
# output JSON
print(toJSON(output));