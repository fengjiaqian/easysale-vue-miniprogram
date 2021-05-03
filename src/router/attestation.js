/* 用户登录认证引导模块 */

//选择身份
const Identity = (resolve) => {
    import('@/views/attestation/identity.vue').then((module) => {
        resolve(module)
    })
}

//填写认证信息
const AttestationForm = (resolve) => {
    import('@/views/attestation/attestationForm.vue').then((module) => {
        resolve(module)
    })
}


const attestation = [
    {
        path: '/identity',
        name: 'identity',
        meta: {
            title: '认证'
        },
        component: Identity
    }, {
        path: '/attestationForm',
        name: 'attestationForm',
        meta: {
            title: '我是客户'
        },
        component: AttestationForm
    },
]

export default attestation
