// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  users: [
    {
      "id": "1",
      "nv_dovlet_nisani": "10 JC 297",
      "markasi": "ZİL-131'A' ATS-4",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "A-92",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "2",
      "nv_dovlet_nisani": "10 JC 234",
      "markasi": "KAMAZ-53212 ATS-10",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "3",
      "nv_dovlet_nisani": "10 JD 185",
      "markasi": "ZİL-130",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-80",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "4",
      "nv_dovlet_nisani": "10 JE 693",
      "markasi": "ZİL-131 ",
      "kolon": "1",
      "id_nv_novu": "Xüsusi qəza xidməti",
      "id_yanacaq_novu": "A-80",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "5",
      "nv_dovlet_nisani": "10 JD 674",
      "markasi": "ZİL-MMZ 554",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-80",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "6",
      "nv_dovlet_nisani": "10 JC 218",
      "markasi": "ZİL-MMZ 4502",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-92",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "7",
      "nv_dovlet_nisani": "10 JD 186",
      "markasi": "ZİL-MMZ 4502",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-92",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "8",
      "nv_dovlet_nisani": "10 JF 429",
      "markasi": "ZİL-MMZ4502",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-92",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "9",
      "nv_dovlet_nisani": "10 JC 219",
      "markasi": "ZİL-MMZ4502",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-92",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "10",
      "nv_dovlet_nisani": "10 JD 687",
      "markasi": "KRAZ-256 B-1",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "11",
      "nv_dovlet_nisani": "10 JP 822",
      "markasi": "KRAZ-256 B-1",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "12",
      "nv_dovlet_nisani": "90 JN 482",
      "markasi": "FORD-CARGO 1826",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "13",
      "nv_dovlet_nisani": "90 JN 481",
      "markasi": "FORD-CARGO 1826",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "14",
      "nv_dovlet_nisani": "90 JN 480",
      "markasi": "FORD-CARGO 1826",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "15",
      "nv_dovlet_nisani": "90 JN 373",
      "markasi": "KAMAZ-53215-1069-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "16",
      "nv_dovlet_nisani": "90 JN 382",
      "markasi": "KAMAZ-53215-1069-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "17",
      "nv_dovlet_nisani": "90 JN 378",
      "markasi": "KAMAZ-53215-1069-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "18",
      "nv_dovlet_nisani": "90 JN 379",
      "markasi": "KAMAZ-53215-1069-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "19",
      "nv_dovlet_nisani": "90 JN 396",
      "markasi": "KAMAZ-53215-1071-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "20",
      "nv_dovlet_nisani": "90 JN 395",
      "markasi": "KAMAZ-53215-1050-15",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "21",
      "nv_dovlet_nisani": "90 JN 392",
      "markasi": "KAMAZ-53215-1050-15",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "22",
      "nv_dovlet_nisani": "90 JN 390",
      "markasi": "KAMAZ-53215-1050-15",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "23",
      "nv_dovlet_nisani": "90 JN 391",
      "markasi": "KAMAZ-53215-1961-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "24",
      "nv_dovlet_nisani": "90 JN 394",
      "markasi": "KAMAZ-53215-1961-15",
      "kolon": "1",
      "id_nv_novu": "Xüsusi",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "25",
      "nv_dovlet_nisani": "10 JC 773",
      "markasi": "ZİL-131-B",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-80",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "26",
      "nv_dovlet_nisani": "10 JC 286",
      "markasi": "ZİL-130 ATSPT-5",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "A-80",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "27",
      "nv_dovlet_nisani": "10 JB 499",
      "markasi": "KAMAZ-53212 AS-10",
      "kolon": "1",
      "id_nv_novu": "Yük-yanacaq daşıyan",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "28",
      "nv_dovlet_nisani": "10 JC 292",
      "markasi": "KAMAZ-53212 ATS-10",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "29",
      "nv_dovlet_nisani": "10 JC 225",
      "markasi": "KAMAZ-53212 ATS-10",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  {
      "id": "30",
      "nv_dovlet_nisani": "10 AD 576",
      "markasi": "KAMAZ-53212 ",
      "kolon": "1",
      "id_nv_novu": "Yük",
      "id_yanacaq_novu": "Dizel",
      "id_yan_doldurma_formasi": "Çən No 1"
  },
  ]
}

const projectListData = [
  {
    id: 1,
    hours: '18:42',
    progressValue: 78,
    totalTask: '122/240',
    progressColor: 'success',
    projectType: 'React Project',
    projectTitle: 'BGC eCommerce App',
    img: '/images/icons/project-icons/react.png'
  },
  {
    id: 2,
    hours: '20:42',
    progressValue: 18,
    totalTask: '9/56',
    progressColor: 'error',
    projectType: 'Figma Project',
    projectTitle: 'Falcon Logo Design',
    img: '/images/icons/project-icons/figma.png'
  },
  {
    id: 3,
    hours: '120:87',
    progressValue: 62,
    totalTask: '290/320',
    progressColor: 'primary',
    projectType: 'VueJs Project',
    projectTitle: 'Dashboard Design',
    img: '/images/icons/project-icons/vue.png'
  },
  {
    id: 4,
    hours: '89:19',
    progressValue: 8,
    totalTask: '7/63',
    progressColor: 'error',
    projectType: 'Xamarin Project',
    projectTitle: 'Foodista Mobile App',
    img: '/images/icons/project-icons/xamarin.png'
  },
  {
    id: 5,
    hours: '230:10',
    progressValue: 49,
    totalTask: '120/186',
    progressColor: 'warning',
    projectType: 'Python Project',
    projectTitle: 'Dojo React Project',
    img: '/images/icons/project-icons/python.png'
  },
  {
    id: 6,
    hours: '342:41',
    progressValue: 92,
    totalTask: '99/109',
    progressColor: 'success',
    projectType: 'Sketch Project',
    projectTitle: 'Blockchain Website',
    img: '/images/icons/project-icons/sketch.png'
  },
  {
    id: 7,
    hours: '12:45',
    progressValue: 88,
    totalTask: '98/110',
    progressColor: 'success',
    projectType: 'HTML Project',
    projectTitle: 'Hoffman Website',
    img: '/images/icons/project-icons/html5.png'
  }
]

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data).data
  const lastId = Math.max(...data.users.map(u => u.id), 0)
  user.id = lastId + 1
  data.users.unshift({ ...user, avatar: '', avatarColor: 'primary', status: 'active' })

  return [201, { user }]
})

// GET: DATA
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', kolon = null, status = null, currentPlan = null } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.users.filter(
    user =>
      (user.nv_dovlet_nisani.toLowerCase().includes(queryLowered) ||
        user.markasi.toLowerCase().includes(queryLowered) ||
        user.kolon.toLowerCase().includes(queryLowered) ||
        (user.email.toLowerCase().includes(queryLowered) &&
          user.currentPlan.toLowerCase().includes(queryLowered) &&
          user.status.toLowerCase().includes(queryLowered))) &&
      user.kolon === (kolon || user.kolon) &&
      user.currentPlan === (currentPlan || user.currentPlan) &&
      user.status === (status || user.status)
  )

  return [
    200,
    {
      allData: data.users,
      users: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  const userId = config.data
  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/users/project-list').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    user =>
      user.projectTitle.toLowerCase().includes(queryLowered) ||
      user.projectType.toLowerCase().includes(queryLowered) ||
      user.totalTask.toLowerCase().includes(queryLowered) ||
      user.hours.toLowerCase().includes(queryLowered) ||
      String(user.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
