
import { cmp, Content, repoInfo } from '@voxgig/sdkgen'


const ReadmeInstall = cmp(function ReadmeInstall(props: any) {
  const { target, ctx$ } = props
  const { model } = ctx$

  const { repoUrl, repo } = repoInfo(model)
  Content(`Clone the repository and build the SDK with Node.js 24 or later:

\`\`\`bash
git clone ${repoUrl}
cd ${repo}/${target.name}
npm ci
npm run build
\`\`\`

Then, from your application directory, install the built SDK:

\`\`\`bash
npm install /absolute/path/to/${repo}/${target.name}
\`\`\`

`)
})


export {
  ReadmeInstall
}
