import { createContext, useContext, useReducer } from "react"

const initialState = {
  form: {
    accountType: null,
    providerType: null,
    accountInfo: {},
    accountName: null,
    accountDescription: null,
    accountPii: false,
    urlDiagram: null,
    coreMetrics: [],
    userAffectation: null,
    users: [],
    meliInitiativeId: null,
    bastionTeam: null,
    vpcValue: null,
    vpcCustomDesc: null,
    subnetValue: null,
    alfred: false,

    meliProjectId: null,
    shieldId: null,
    furyQuestion: null,
    requestedBy: null,
    
    accountServices: [],
    matchedQuestions: []
  },
  setAccountInfo: (accountInfo) => null,
  setAccountName: (accountName) => null,
  setAccountDescription: (accountDescription) => null,
  setAccountPii: (pii) => null,
  setUrlDiagram: (urlDiagram) => null,
  setCoreMetrics: (coreMetrics) => null,
  setUserAffectation: (userAffectation) => null,
  setUserName: (username, index) => null,
  setUserRole: (role, index) => null,
  addUser: (user) => null,
  removeUser: (index) => null,
  setMeliInitiativeId: (meliInitiativeId) => null,
  setBastionTeam: (bastionTeam) => null,
  setVpcValue: (vpcValue) => null,
  setSubnetValue: (subnetValue) => null,
  setVpcCustomDesc: (vpcCustomDesc) => null,
  setAlfred: (alfred) => null,

  setAccountServices: (accountName) => null,
  setMatchedQuestions: (matchedQuestions) => null
}

const FormContext = createContext(initialState)

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {

    case 'SET_ACCOUNT_INFO':
      return {
        ...state,
        form: payload.accountInfo
      }

    case 'SET_ACCOUNT_NAME':
      return {
        ...state,
        form: {
          ...state.form,
          accountName: payload.accountName
        }
      }

    case 'SET_ACCOUNT_DESCRIPTION':
      return {
        ...state,
        form: {
          ...state.form,
          accountDescription: payload.accountDescription
        }
    }

    case 'SET_ACCOUNT_PII':
      return {
          ...state,
          form: {
              ...state.form,
              accountPii: payload.accountPii,
          }
      }

    case 'SET_URL_DIAGRAM':
      return {
        ...state,
        form: {
          ...state.form,
          urlDiagram: payload.urlDiagram
        }
      }

    case 'SET_CORE_METRICS':
      return {
        ...state,
        form: {
          ...state.form,
          coreMetrics: payload.coreMetrics
        }
      }
    
    case 'SET_USER_AFFECTATION':
      return {
          ...state,
          form: {
              ...state.form,
              userAffectation: payload.userAffectation
          }
      }

    case 'SET_USER_USERNAME':
      const newArrayUsername = [...state.form.users]
      newArrayUsername[payload.index].username = payload.username
      return {
        ...state,
        form: {
          ...state.form,
          users: newArrayUsername
        }
      }

    case 'SET_USER_ROLE':
        const newArrayRole = [...state.form.users]
        newArrayRole[payload.index].role = payload.role
        return {
          ...state,
          form: {
            ...state.form,
            users: newArrayRole
          }
      }

    case 'ADD_USER':
      const addArray = [...state.form.users]
      addArray.push(payload.user)
      return {
        ...state,
        form: {
          ...state.form,
          users: addArray
        }
      }

    case 'REMOVE_USER':
      const removeArray = [...state.form.users]
      removeArray.splice(payload.index, 1)
      return {
        ...state,
        form: {
          ...state.form,
          users: removeArray
        }
      }

    case 'SET_MELI_INITIATIVE_ID':
      return {
        ...state,
        form: {
          ...state.form,
          meliInitiativeId: payload.meliInitiativeId,
        }
      }

    case 'SET_BASTION_TEAM':
      return {
        ...state,
        form: {
          ...state.form,
          bastionTeam: payload.bastionTeam,
        }
      }

    case 'SET_VPC_VALUE':
      return {
        ...state,
        form: {
          ...state.form,
          vpcValue: payload.vpcValue,
        }
      }
    
    case 'SET_SUBNET_VALUE':
      return {
        ...state,
        form: {
          ...state.form,
          subnetValue: payload.subnetValue,
        }
      }

    case 'SET_VPC_CUSTOM_DESC':
      return {
        ...state,
        form: {
          ...state.form,
          vpcCustomDesc: payload.vpcCustomDesc,
          }
      }

    case 'SET_ALFRED':
      return {
        ...state,
        form: {
          ...state.form,
          alfred: payload.alfred
        }
      }


    case 'SET_ACCOUNT_SERVICES':
      return {
        ...state,
        form: {
          ...state.form,
          accountServices: payload.accountServices
        }
      }

    case 'SET_MATCHED_QUESTIONS':
      return {
        ...state,
        form: {
          ...state.form,
          matchedQuestions: payload.matchedQuestions
        }
      }

    default:
      return state
  }
}

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setAccountInfo = (accountInfo) => {
    dispatch({
      type: 'SET_ACCOUNT_INFO',
      payload: { accountInfo }
    })
  }

  const setAccountName = (accountName) => {
    dispatch({
      type: 'SET_ACCOUNT_NAME',
      payload: { accountName }
    })
  }

  const setAccountDescription = (accountDescription) => {
    dispatch({
      type: 'SET_ACCOUNT_DESCRIPTION',
      payload: { accountDescription }
    })
  }

  const setAccountPii = (accountPii) => {
    dispatch({
      type: 'SET_ACCOUNT_PII',
      payload: { accountPii }
    })
  }

  const setUrlDiagram = (urlDiagram) => {
    dispatch({
      type: 'SET_URL_DIAGRAM',
      payload: { urlDiagram }
    })
  }

  const setCoreMetrics = (coreMetrics) => {
    dispatch({
      type: 'SET_CORE_METRICS',
      payload: { coreMetrics }
    })
  }

  const setUserAffectation = (userAffectation) => {
    dispatch({
      type: 'SET_USER_AFFECTATION',
      payload: { userAffectation }
    })
  }

  const setUserName = (username, index) => {
    dispatch({
      type: 'SET_USER_USERNAME',
      payload: { username, index }
    })
  }

  const setUserRole = (role, index) => {
    dispatch({
      type: 'SET_USER_ROLE',
      payload: { role, index }
    })
  }

  const addUser = (user) => {
    dispatch({
      type: 'ADD_USER',
      payload: { user }
    })
  }

  const removeUser = (index) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: { index }
    })
  }

  const setMeliInitiativeId = (meliInitiativeId) => {
    dispatch({
      type: 'SET_MELI_INITIATIVE_ID',
      payload: { meliInitiativeId }
    })
  }

  const setBastionTeam = (bastionTeam) => {
    dispatch({
      type: 'SET_BASTION_TEAM',
      payload: { bastionTeam }
    })
  }

  const setVpcValue = (vpcValue) => {
    dispatch({
      type: 'SET_VPC_VALUE',
      payload: { vpcValue }
    })
  }

  const setSubnetValue = (subnetValue) => {
    dispatch({
      type: 'SET_SUBNET_VALUE',
      payload: { subnetValue }
    })
  }

  const setVpcCustomDesc = (vpcCustomDesc) => {
    dispatch({
      type: 'SET_VPC_CUSTOM_DESC',
      payload: { vpcCustomDesc }
    })
  }

  const setAlfred = (alfred) => {
    dispatch({
      type: 'SET_ALFRED',
      payload: { alfred }
    })
  }



  const setAccountServices = (accountServices) => {
    dispatch({
      type: 'SET_ACCOUNT_SERVICES',
      payload: { accountServices }
    })
  }

  const setMatchedQuestions = (matchedQuestions) => {
    dispatch({
      type: 'SET_MATCHED_QUESTIONS',
      payload: { matchedQuestions }
    })
  }

  const value = {
    form: state.form,
    setAccountInfo,
    setAccountName,
    setAccountDescription,
    setAccountPii,
    setUrlDiagram,
    setCoreMetrics,
    setUserAffectation,
    setUserName,
    setUserRole,
    addUser,
    removeUser,
    setMeliInitiativeId,
    setBastionTeam,
    setVpcValue,
    setSubnetValue,
    setVpcCustomDesc,
    setAccountServices,
    setAlfred,
    setMatchedQuestions
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

const useForm = () => {
  const context = useContext(FormContext)

  if (context === undefined) throw new Error()

  return context
}

export {useForm, FormProvider}
