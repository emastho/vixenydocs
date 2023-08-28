import { minify } from "html-minifier-terser"
import { building } from "$app/environment"

const options = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    html5: true,
    ignoreCustomComments: [/^#/],
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: false, // some hydration code needs comments, so leave them in
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true
}

export async function handle({ event, resolve }) {
    let page = '';

    return resolve(event, {
        transformPageChunk: ({ html, done }) => {
            page += html;
            if (done) {
                return building ? minify(page, options) : page;
            }
        }
    });
}


export const actions = {
    default: async (event) => {
        const { values } = await validate(event)
        const { username, password } = values
        const user = await userRepo.findOne({ where: { username: username! } })
        if (!user) {
            return { error: 'User not found', ...values }
        }

        if (
            !(await verify(user.password, password!, { secret: Buffer.from(SECRET) }))
        ) {

            return { error: 'Incorrect password', ...values }
        }
        // Successful login
        throw redirect(302, '/')

    }
}
