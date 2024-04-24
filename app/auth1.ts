// ITS MY rough draft OWN NEXTAUTH FUNCTION.JUST IGNORE IT
function NextAuth(obj) {
    console.log('start');
    let auth = {}
    async function signIn(type, credentials) {
        if (type === 'credentials') {
            const user = await obj.providers[0].authorize(credentials)
            //result.then((o)=>{return user = o.username})        
            if (user) {
                auth = user
                console.log('user', auth);
            }
            else { }
        }
    }
    return { signIn, auth }
}

export const { signIn, auth } = NextAuth({
    //...authConfig,
    providers: [{
        // CredentialsProvider({
        async authorize(credentials) {
            try {
                // const user = await login(credentials);
                return credentials
            } catch (err) { return null; }
        },
    }//}),
    ],
});

