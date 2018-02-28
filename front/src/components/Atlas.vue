<template lang="jade">
    section.content
        .container
            .row 
                .htmleaf-container.atlas_current
                    .htmleaf-content.bgcolor-3
                        ul.pgwSlideshow
                            li(v-for='img in imgs')
                                //- img(src="#{JSON.parse(imgs)[i]}", alt="San Francisco, USA", data-description="Golden Gate Bridge")
                                img(:src="baseUrl+img.img.src" ,:alt="img.name" ,:data-description="img.desc")

                        div(style="text-align:center;clear:both")
</template>

<script>
    // require('../assets/js/proDesc.js')
    import {getAtlas} from "../assets/js/proDesc.js"
    import "../assets/js/lib/pgwslideshow.js"
    export default {
        name: 'aboutUs',
        data(){
            return {
                imgs:{},
                length:0,
            }
        },
        mounted(){

            this.getAllProImg().then((res)=>{
                $('.pgwSlideshow').pgwSlideshow({
                    // transitionEffect:'fading',
                    autoSlide:true
                });
            },error=>{
                // console.log(error);
                this.autoAlert(error.statusText,'red')
            })
        },
        methods: {
            getAllProImg(){
                // getProById(param.id)
                return getAtlas().then(res=>{
                    console.log('res:',res)
                    if(res.code == 0){

                        this.imgs = res.imgs
                    }else if(res.length == 0){
                        this.autoAlert(res.msg,'orange')
                        this.$router.push({
                            path:'/page'
                        })
                    }
                    this.length = res.length

                    console.log('imgs:',this.imgs)
                },error=>{
                    this.autoAlert(error.statusText,'red')
                })
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
