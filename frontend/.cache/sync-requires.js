const { hot } = require("react-hot-loader/root");

// prefer default export if available
const preferDefault = m => (m && m.default) || m;

exports.components = {
  "component---src-templates-blog-post-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/templates/blog-post.tsx")
    )
  ),
  "component---src-templates-tags-page-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/templates/tags-page.tsx")
    )
  ),
  "component---src-templates-blog-page-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/templates/blog-page.tsx")
    )
  ),
  "component---cache-dev-404-page-js": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/.cache/dev-404-page.js")
    )
  ),
  "component---src-pages-404-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/404.tsx")
    )
  ),
  "component---src-pages-about-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/about.tsx")
    )
  ),
  "component---src-pages-auth-signin-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/auth/signin.tsx")
    )
  ),
  "component---src-pages-auth-signup-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/auth/signup.tsx")
    )
  ),
  "component---src-pages-blog-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/blog.tsx")
    )
  ),
  "component---src-pages-form-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/form.tsx")
    )
  ),
  "component---src-pages-index-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/index.tsx")
    )
  ),
  "component---src-pages-modlist-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/modlist.tsx")
    )
  ),
  "component---src-pages-module-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/module.tsx")
    )
  ),
  "component---src-pages-review-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/review.tsx")
    )
  ),
  "component---src-pages-search-tsx": hot(
    preferDefault(
      require("/Users/mac/projects/nusreviews/frontend/src/pages/search.tsx")
    )
  )
};
