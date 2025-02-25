import bcrypt from 'bcrypt'

// Hash Password
export const hashpassword = async(password)=>{
    try {
        const saltRounds = 7;
       const hashedPassword = await bcrypt.hash(password, saltRounds)
       return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}



// Compare Password
export const comparePassword = async (password, hashedPassword) =>{
    return bcrypt.compare(password, hashedPassword);
    }