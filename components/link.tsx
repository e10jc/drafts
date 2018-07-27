import NextLink from 'next/link'
import {Link} from 'rebass'

export default(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <NextLink href={props.href}>
  <Link {...props} />
</NextLink>