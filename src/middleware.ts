import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth){
        const url = request.nextUrl.clone();
        url.pathname = '/';

        if(request.nextUrl.pathname.startsWith("/admin") && !request.nextauth.token?.isAdmin)
        return NextResponse.redirect(url);        
    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        }
    }
)

export const config = { matcher: ["/admin", '/account', '/payment', '/orders'] }