import { useEffect, useState } from 'react';
import { Form, Input, Tooltip, Space, Switch, Layout, Card, Button, Select, Row, Col } from 'antd'
import { QuestionCircleOutlined, SyncOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from "./formContext"
import './App.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 24, offset: 8 }
};


const providerServices = ["S3","SQS","SNS","EC2","EKS"]
const coreMetrics = ["pagos-off","pagos-on","preguntas","respuestas","total-listings","not-apply"]
const userAffectation = ["INTERNAL", "EXTERNAL", "BOTH"]
const initiatives = [
  {
		"id_initiative": 1015,
		"external_code": "1554211945827",
		"external_name": "1P Planning - BI & Analytics",
		"status": true,
		"last_update": "2022-05-06T00:00:00Z"
  },
	{
		"id_initiative": 1052,
		"external_code": "advertising",
		"external_name": "Advertising",
		"status": true,
		"last_update": "2020-12-16T00:00:00Z"
	},
]
const teamsBastion  = ["Governance-IT","OperationalIntelligence","Device Farm","services","mshops","idm","Shipping","arqcloud","Other"]

const vpcs = [
  '/20 (4096 IPs disponibles)',
  '/21 (2048 IPs disponibles)',
  '/22 (1024 IPs disponibles)',
  '/23 (512 IPs disponibles)',
  '/24 (256 IPs disponibles)',
  '/25 (128 IPs disponibles)',
  '/26 (64 IPs disponibles)',
  '/27 (32 IPs disponibles)',
  'Mayor cantidad',
  'None'
];

const subnets = [
  '2 subnets multi AZ (2 privadas) - DEFAULT',
  '1 subnets (1 privada)',
  '4 subnets multi AZ (4 privadas)'
];

function App() {
  const {
    form,
    setAccountInfo,
    setAccountName,
    setAccountDescription,
    setAccountPii,
    setUrlDiagram,
    setCoreMetrics,
    setUserAffectation,
    setAccountServices,
    setMeliInitiativeId,
    setBastionTeam,
    setVpcValue,
    setVpcCustomDesc,
    setAlfred,
    setMatchedQuestions
  } = useForm()
  const [formRef] = Form.useForm();
  const [customVpc, setCustomVpc] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const responseData = {
        "id": 1,
        "bastion_team": "BuyBox2",
        "name": "TEST1",
        "description": "estamos testando",
        "meli_initiative_id": 1015,
        "meli_project_id": "",
        "shield_id": "TEST1",
        "core_metrics": ["dwdwa", "dwdawd"],
        "resources": [{"name": "SQS","reason": "Porque si", "service": "STREAMS"}],
        "user_affectation": "BOTH",
        "type": "PROD",
        "fury_question": "tdasds",
        "requested_by": "test",
        "vpc_value": "vpc VALUES",
        "vpc_custom_desc": "vpc_test_1",
        "subnet_value": "2 subnets multi AZ (2 privadas) - DEFAULT",
        "pii": true,
        "provider": "AWS",
        "url_diagram": "https://google.com",
        "alfred": true,
        "users": [
          {
            "username": "123",
            "role": "TECHNICAL"
          }
        ]
      }

      const dataConvert = {
        accountType: responseData.type,
        providerType: responseData.provider,
        accountName: responseData.name,
        accountDescription: responseData.description,
        accountPii: responseData.pii,
        accountServices: responseData.resources.map(resource => resource.name),
        urlDiagram: responseData.url_diagram,
        coreMetrics: responseData.core_metrics,
        userAffectation: responseData.user_affectation,
        users: responseData.users,
        meliInitiativeId: responseData.meli_initiative_id,
        bastionTeam: responseData.bastion_team,
        vpcValue: responseData.vpc_value,
        subnetValue: responseData.subnet_value,
        vpcCustomDesc: responseData.vpc_custom_desc,
        alfred: responseData.alfred,
        matchedQuestions: responseData.resources.map(resource => {
          return {
            awsService: resource.name,
            furyService: resource.service,
            question: `Why don't use ${resource.service} insted of ${resource.name}?`,
            reason: resource.reason,
          }
        })
        
      }
      setAccountInfo(dataConvert)
    }, 1000)

  }, [])

  const handleSave = () => {
    console.log(formRef.getFieldsValue())
    console.log(form)
  }

  const verifyService = async (services) => {
    const response = await fetch(`http://127.0.0.1:8080/cc-accounts/match-services?resources=${services.toString()}`)

    const responseData = await response.json()

    const matchServices = responseData.map((data) => {
      return {
        awsService: data.name,
        furyService: data.fury_service.name,
        question: `Why don't use ${data.fury_service.name} insted of ${data.name}?`,
        reason:
          form.matchedQuestions.length === 0 ? null :
          form.matchedQuestions.find(match => match.awsService === data.name) !== undefined ?
          form.matchedQuestions.find(match => match.awsService === data.name).reason : null
      }
    })

    setMatchedQuestions(matchServices)
  }

  const handleMatchedAnsware = (questionId, reasonValue) => {
    const matchedQuestions = [...form.matchedQuestions]
    const question = matchedQuestions.find((question) => question.id === questionId)
    question.reason = reasonValue
    setMatchedQuestions(matchedQuestions)
  }

  const onVpcCustom = (customVpc) => {
    setCustomVpc(customVpc);
  };

  const fields = [
    {name: 'accountType', value: form.accountType},
    {name: 'providerType', value: form.providerType},
    {name: 'accountName', value: form.accountName},
    {name: 'accountDescription', value: form.accountDescription},
    {name: 'accountPii', value: form.accountPii},
    {name: 'urlDiagram', value: form.urlDiagram},
    {name: 'coreMetrics', value: form.coreMetrics},
    {name: 'userAffectation', value: form.userAffectation},
    {name: 'users', value: form.users},
    {name: 'initiativeExternalId', value: form.meliInitiativeId},
    {name: 'bastionTeam', value: form.bastionTeam},
    {name: 'vpcValue', value: form.vpcValue},
    {name: 'subnetValue', value: form.subnetValue},
    {name: 'vpcCustomDesc', value: form.vpcCustomDesc},
    {name: 'alfred', value: form.alfred},
    {name: 'services', value: form.accountServices},
  ]

  return (
    <div className='formContent'>
      <Form
        form={formRef}
        name="basic"
        fields={fields}
      >
        <Layout.Content>
          <Card type='inner' title="Production">
            <Form.Item
              {...layout}
              name="providerType"
              style={{ marginBottom: 12 }}
              label="Provider Type"
              rules={[{ required: true }]}
            >
              <Input disabled />  
            </Form.Item>

            <Form.Item
              {...layout}
              name="accountName"
              style={{ marginBottom: 12 }}
              label="Account Name"
              rules={[
                {
                  required: true,
                  message: "Please, 'name' is required. Do not use more than 30 characters and special ones!"
                }
              ]}
            >
              <Input onChange={(e) => setAccountName(e.target.value)} placeholder='Name' />
            </Form.Item>

            <Form.Item
              {...layout}
              name="accountDescription"
              style={{ marginBottom: 25 }}
              label={
                <Space size={4}>
                  Description{''}
                  <Tooltip title="Think and write the account description here">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Space>
              }
              rules={[{ required: true, message: 'Please, write the account description' }]}
            >
              <Input.TextArea
                showCount
                maxLength={250}
                onChange={(e) => setAccountDescription(e.target.value)}
                placeholder="Here, account description and what is the business and development purpose..."
              />
            </Form.Item>

            <Form.Item
              {...layout}
              name="accountPii"
              style={{ marginBottom: 12 }}
              label="Account Includes Data PII"
              valuePropName="checked"
            >
              <Switch onChange={(checked) => setAccountPii(checked)} />
            </Form.Item>
          </Card>
        </Layout.Content>

        <Layout.Content>
          <Card type="inner" title={`${form.providerType} Services`}>
            <Form.Item
              name="services"
              style={{ marginBottom: 12, }}
              label="Services"
              rules={[{ required: true }]}
              >
                <Select onChange={(value) => setAccountServices(value)} mode="multiple" showSearch placeholder="Select Services">
                  {providerServices.map((service) => (
                    <Select.Option key={service} value={service}>
                      {service}
                    </Select.Option>
                  ))}
                </Select>

                 
                {/* <Row justify={"space-between"} gutter={5}>
                  <Col span={22}>
                    <Select onChange={(value) => setAccountServices(value)} mode="multiple" showSearch placeholder="Select Services">
                      {providerServices.map((service) => (
                        <Select.Option key={service} value={service}>
                          {service}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                  <Col>
                    <Button icon={<SyncOutlined />} onClick={() => verifyService(form.accountServices)} ></Button>
                  </Col>
                </Row> */}
               
                
                {/* NAO reseta o Select.Option => Mais nao envia os services selecionados */}
                {/* <Button icon={<SyncOutlined />} onClick={() => verifyService(form.accountServices)} /> */}
            </Form.Item>

            {/* Reseta o Select.Option => Mais envia os services selecionados*/}
            <Button icon={<SyncOutlined />} onClick={() => verifyService(formRef.getFieldValue("services"))} />
            
            {form.matchedQuestions && form.matchedQuestions.map((question, index) => (
              <Form.Item  style={{ marginBottom: 12, }} key={index} label={question.question} >
                <Input placeholder='response' value={question.reason} onChange={(event) => handleMatchedAnsware(question.id, event.target.value)} />
              </Form.Item>
            ))}
          </Card>
        </Layout.Content>

        <Layout.Content>
          {!form.accountServices.includes(923) ? (
            <Card type='inner' title="Share diagram">
              <Form.Item
                {...layout}
                name="urlDiagram"
                style={{ marginBottom: 12 }}
                label="Share link diagram"
              >
                <Input onChange={(event) => setUrlDiagram(event.target.value)} />
              </Form.Item>
            </Card>
          ) : null}
        </Layout.Content>
          
        <Layout.Content>
          <Card type="inner" title="Service Affectation">
            <p>
              Please, indicate if the account is going to affect core metrics and which ones.
              Then select what type of user impact applies.
            </p>
            <Form.Item
              {...layout}
              name="coreMetrics"
              style={{ marginBottom: 12 }}
              label="Core Metrics"
              rules={[{ required: true }]}
            >
              <Select onChange={(value) => setCoreMetrics(value)} mode="multiple" showSearch placeholder="Select Core Metrics">
                {coreMetrics.length !== 0 ? (
                  coreMetrics.map((coreMetric) => (
                    <Select.Option key={coreMetric} value={coreMetric}>
                      {coreMetric}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="Default">Default</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              label="User Affectation"
              name="userAffectation"
              rules={[{ required: true }]}
            >
              <Select onChange={(value) => setUserAffectation(value)} showSearch placeholder="Select User Affectation">
                {userAffectation.length !== 0 ? (
                  userAffectation.map((userAffec) => (
                    <Select.Option key={userAffec} value={userAffec}>
                      {userAffec}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="Default">Default</Select.Option>
                )}
              </Select>
            </Form.Item>
          </Card>
        </Layout.Content>
        
        <Layout.Content>
          <Card
            type="inner"
            title={
              <>
                Account Users{' '}
                <Tooltip title="Fill with users and roles to manage the account">
                  <QuestionCircleOutlined />
                </Tooltip>
              </>
            }
          >
            <Form.List {...layout} style={{ marginBottom: 12 }} label="test" name="users">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row gutter={[4, 4]} key={field.key}>
                        <Col span={6} offset={6}>
                          <Form.Item
                            {...formItemLayoutWithOutLabel}
                            name={[field.name, 'username']}
                            fieldKey={[field.fieldKey, 'username']}
                          >
                            <Input placeholder="Username LDAP" />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name={[field.name, 'role']}
                            fieldKey={[field.fieldKey, 'role']}
                          >
                            <Select placeholder="Role">
                              <Select.Option value="OWNER">
                                Owner{' '}
                                <span className="select-option">
                                  ( Access: Costs, Optmizations | Users: Approval requests )
                                </span>
                              </Select.Option>
                              <Select.Option value="TECHNICAL">
                                Technical{' '}
                                <span className="select-option">
                                  ( Access: Optmizations | Users: Approval requests )
                                </span>
                              </Select.Option>
                              <Select.Option value="USER">
                                User <span className="select-option">( No Access )</span>
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                            }}
                            style={{ color: 'red' }}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col span={12} offset={8}>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            style={{ width: '100%' }}
                          >
                            <PlusOutlined /> Add user
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            </Form.List>
          </Card>
        </Layout.Content>

        <Layout.Content>
          <Card type="inner" title="Cost Allocation">
            <p>
              Here you select the initiative to which this project belongs and where the costs
              will be. Remember that all expenses generated by the account will be under the
              selected initiative.
            </p>
            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              name={'initiativeExternalId'}
              label="Initiative"
              rules={[{ required: true, message: "'Initiative' is required" }]}
            >
              {/* <Select showSearch placeholder="Select initiative">
                {initiatives
                  ? Object.entries(initiatives).map((item) => (
                    <Select.Option key={item[1].external_code} value={item[1].external_code}>
                      {item[1].external_name}
                    </Select.Option>
                  ))
                  : null}
              </Select> */}

              <Select onChange={(value) => setMeliInitiativeId(value)} showSearch placeholder="Select initiative">
                {initiatives.map((item) => (
                  <Select.Option key={item.id_initiative} value={item.id_initiative}>
                    {item.external_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
         </Card>
        </Layout.Content>
        
        <Layout.Content>
          <Card type="inner" title="Bastion Configurations">
            <p>
              Bastion Team groups together accounts of the same work team. This field means
              the 'CrossAccountManager' role that will be define for the account. If you have
              previously selected a bastion team, you must select the same one. If not in
              list, select 'Other' and create one.
            </p>
            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              name="bastionTeam"
              label="Bastion Team"
              rules={[{ required: true, message: "'Bastion Team' is required" }]}
            >
              <Select
                showSearch
                onChange={(value) => setBastionTeam(value)}
                placeholder="Select if you have a bastion team. If not create one"
              >
                {teamsBastion.length !== 0 ? (
                  teamsBastion.map((teamBastion) => (
                    <Select.Option key={teamBastion} value={teamBastion}>
                      {teamBastion}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="Default">Default</Select.Option>
                )}
              </Select>
            </Form.Item>
            
            {form.bastionTeam === 'Other' && (
              <Form.Item
                {...layout}
                style={{ marginBottom: 12 }}
                name="department"
                label="New"
                rules={[
                  {
                    required: form.bastionTeam === 'Other',
                    message: 'Please, indicate the new bastion team'
                  }
                ]}
              >
                <Input
                  placeholder="Write here your new Bastion Team"
                  disabled={form.bastionTeam !== 'Other'}
                />
              </Form.Item>
            )}
          </Card>
        </Layout.Content>

        <Layout.Content>
          <Card type="inner" title="Connectivity">
            <p>
              In this step you can choose between different types of pre-defined
              infrastructure or some custom configurations. Please note that you can select
              'None' in VPC if the account do not need infra{' '}
              <em>(this option makes the process faster)</em>. Otherwise, if custom
              configurations are needed please check the switch and write VPC size and subnets
              amount (private or/and public) <em>(this option makes the process slower)</em>.
            </p>
            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              name="vpcValue"
              label="VPC"
              rules={[{ required: !customVpc }]}
            >
              <Select
                onChange={(value) => setVpcValue(value)}
                disabled={customVpc}
                showSearch
                placeholder="Amount of ip required (Default - /24)"
              >
                {vpcs.length !== 0 ? (
                  vpcs.map((vpc) => (
                    <Select.Option key={vpc} value={vpc}>
                      {vpc}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="Default">Default</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              name="subnetValue"
              label="Subnets"
              rules={[{ required: form.subnetValue !== 'None' && !customVpc }]}
            >
              <Select
                disabled={form.subnetValue === 'None' || customVpc}
                showSearch
                placeholder="Amount of subnets (Private or internet exposed networks)"
              >
                {subnets.length !== 0 ? (
                  subnets.map((subnet) => (
                    <Select.Option key={subnet} value={subnet} label={subnet}>
                      {subnet}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="Default" />
                )}
              </Select>
            </Form.Item>

            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              label="¿Need custom configurations?"
              name="vpc-custom"
              valuePropName="checked"
              rules={[{ required: customVpc, message: 'Please, write what you need.' }]}
            >
              <Switch onChange={onVpcCustom} />
            </Form.Item>

            {customVpc && (
              <Form.Item
                {...layout}
                name="vpcCustomDesc"
                label="Custom configurations description"
                rules={[{ required: customVpc, message: 'Please, write what you need.' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={250}
                  disabled={!customVpc}
                  onChange={(event => setVpcCustomDesc(event.target.value))}
                  placeholder="VPC size and subnets amount (private or/and public). Similar to the combo above. Ej. /26 (64 IPs disponibles) con 6 subnets (4 públicas / 2 privadas)"
                />
              </Form.Item>
            )}
          </Card>
        </Layout.Content>

        <Layout.Content>
          <Card type="inner" title="Alfred-SSH configurations">
            <p>
              ¿Allow account to make use of alfred-ssh? This switchs means you will’ve
              networking ready for use alfred-ssh in your instances when account creation is
              completed. If 'None' VPC has been selected, this option cannot be set. Remember
              you need VPC to enable this feature. <br></br>
              For more info, please read our{' '}
              <a
                href="https://furydocs.io/cloudcontroller/guide/#/alta-en-cc/aws/form?id=alfred-ssh"
                target="_blank"
                rel="noreferrer"
              >
                guide.
              </a>{' '}
              <br></br>
              <em>
                This process makes the creation slower because lot of tickets and requests
                authorizations have to be granted (SLA 3 days).
              </em>
            </p>
            <Form.Item
              {...layout}
              style={{ marginBottom: 12 }}
              name="alfred"
              label="¿Enable alfred-ssh?"
              valuePropName="checked"
            >
              <Switch  onChange={(value) => setAlfred(value)} disabled={form.vpcValue === 'None'} />
            </Form.Item>
          </Card>
        </Layout.Content>

        
        <Button type="primary" onClick={() => handleSave()}>
          Save
        </Button>
      </Form>
    </div>
  )
}

export default App
