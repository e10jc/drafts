import NextLink from 'next/link'
import {Link} from 'rebass'

export default(props: any) => <NextLink href={props.href}>
  <Link {...props} />
</NextLink>