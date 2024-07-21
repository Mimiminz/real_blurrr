import StyledComponentsRegistry from '../lib/registry'
import Header from '@/components/common/layout/Header'
import Footer from '@/components/common/layout/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <Header/>
          {children}
          <Footer/>
        </StyledComponentsRegistry>     
      </body>
    </html>
  )
}