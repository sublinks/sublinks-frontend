# sublinks-js-client
A Javascript/Typescript client to interact with Sublinks.

Acts as a drop-in replacement for `lemmy-js-client` for app developers who want to port their Lemmy clients to Sublinks. The library is targeting the 0.19.0 Lemmy API as that will be
the major release version at the time Sublinks launches.  The unified client library will allow for a graceful switchover to the native Sublinks API as it is developed and matures.

Currently, all `lemmy-js-client` methods are simply wrapped, and all of its types are re-exported.  

As the native Sublinks API is developed, new methods and types will be added to this library to access those.  Once the native API matures sufficiently, the Lemmy API compatibility will be removed from the backend and `lemmy-js-client` phased out and removed as a dependency of this client library.

This client may also gain additional convenience methods for the Lemmy JS client, so even if you're developing for that platform, you may find this library useful. Since the Lemmy API will eventually be phased out and removed from this library, you will likely want to fork this into a new project.

**Note**: Hover information is only provided for methods that are not native to `lemmy-js-client`.  e.g. `setAuth`, `setHeader`, and any future Sublinks native API methods.  Please see the `lemmy-js-client` docs if you need those.


### Client API Documentation
The documentation is generated with TypeDoc and is available [here](https://sublinks.github.io/js-client/).

There are 3 ways to use the library:
1) Use the universal client: `SublinksClient` 
2) Use the native client: `SublinksHttp`
3) Use the Lemmy-only client: `LemmyHttp`

It is recommended to use the universal client to take advantage of the compatibility API so that applications can slowly transition to the native API as it matures.


### Example (Lemmy Compatibility API)

```Javascript
import { 
    type GetSiteResponse,
    SublinksClient 
} from 'sublinks-js-client'

let site: GetSiteResponse | undefined = undefined

const client = new SublinksClient('sublinks.example.com');

try {
    let { jwt }  = await client.login({
        username_or_email: 'TestUser',
        password: '$uperS3cre+P@$sw0rd!'
    })

    if (jwt) client.setAuth(jwt);

    site = await client.getSite(); 
}
catch (err) {
    console.log(err)
}


if (site?.my_user) console.log("Successfully logged in");
else console.log("Login was unsuccessful");
```

### Example (Native API)
The native API is accessed the same way as the compatibility API from the same client class. During the compatibility phase, you will need to refer to the API documentation or the client's typedocs to determine which methods belong to which API.



```Javascript
import { SublinksClient } from 'sublinks-js-client'

const client = new SublinksClient('sublinks.example.com');

let version = await client.APIVersion()

console.log(version);

/* Output
{
    success: true,
    message: '1.0.0'
}
*/
```


### Usage with Insecure HTTP
By default, the client library will enforce HTTPS even if you specify `http://` in the instance parameter. Under 99.9% of all scenarios, you should take the hint and make sure HTTPS is enabled on your API endpoint.  However, there are times when it may be desirable/necessary to use insecure HTTP such as internal testing or working against the API via localhost.

To bypass the HTTPS enforcement, you will need to set `insecure: true` in the `options` object and include that in the client constructor.

```Javascript
// All of these will treat the instance URL as HTTP

const client = new SublinksClient('http://sublinks.example.com', {insecure: true} );

const client = new SublinksClient('https://sublinks.example.com', {insecure: true} );

const client = new SublinksClient('sublinks.example.com', {insecure: true} );
```

Any of those are valid.  When the `insecure` option is set, the instance value is treated as `http` regardless of the scheme.  Setting the `insecure` flag **does not** have any effect on HTTPS URLs, such as ignoring cert validity; it merely tells the client to use HTTP instead of HTTPS.

**Do not set the insecure in production or when accessing the API over the internet!**

You will be exposing your instance and your users to risk. The option only exists to assist developers under certain relatively safe conditions.