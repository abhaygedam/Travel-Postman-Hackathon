


module.exports = (permittedRoles) => {
    return function (req, res, next) {
        
        const user = req.user;
       
        const isPermittedArray = user.roles.filter((role) =>
            permittedRoles.includes(role)
        );

        if (isPermittedArray.length == 0) {
            return res.status(403).json({ message: "You are not permitted to acess this" });
        }
        
        return next();
    }
}
