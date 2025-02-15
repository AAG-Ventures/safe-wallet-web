import TxLayout from '@/components/tx-flow/common/TxLayout'
import SignMessage, { type ConfirmProps, type ProposeProps } from '@/components/tx-flow/flows/SignMessage/SignMessage'
import { getSwapTitle, SWAP_TITLE } from '@/features/swap'
import { selectSwapParams } from '@/features/swap/store/swapParamsSlice'
import { useAppSelector } from '@/store'
import { Box, Typography } from '@mui/material'
import SafeAppIconCard from '@/components/safe-apps/SafeAppIconCard'

const APP_LOGO_FALLBACK_IMAGE = '/images/apps/apps-icon.svg'
const APP_NAME_FALLBACK = 'Sign message'

export const AppTitle = ({ name, logoUri }: { name?: string | null; logoUri?: string | null }) => {
  const swapParams = useAppSelector(selectSwapParams)

  const appName = name || APP_NAME_FALLBACK
  const appLogo = logoUri || APP_LOGO_FALLBACK_IMAGE

  const title = name === SWAP_TITLE ? getSwapTitle(swapParams.tradeType) : appName

  return (
    <Box display="flex" alignItems="center">
      <SafeAppIconCard src={appLogo} alt={name || 'The icon of the application'} width={32} height={32} />
      <Typography variant="h4" pl={2} fontWeight="bold">
        {title}
      </Typography>
    </Box>
  )
}

const SignMessageFlow = ({ ...props }: ProposeProps | ConfirmProps) => {
  return (
    <TxLayout
      title="Confirm message"
      subtitle={<AppTitle name={props.name} logoUri={props.logoUri} />}
      step={0}
      hideNonce
      isMessage
    >
      <SignMessage {...props} />
    </TxLayout>
  )
}

export default SignMessageFlow
