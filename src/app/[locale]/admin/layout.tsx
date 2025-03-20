import AdminTabs from "./_components/AdminTabs"

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <>
    <AdminTabs /> 
    {children}
    </>
  )
}

export default layout