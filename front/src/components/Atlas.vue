<template lang="jade">
    section
        .container
            .row 
                .htmleaf-container.atlas_current
                    .htmleaf-content.bgcolor-3
                        ul.pgwSlideshow
                            li(v-for='img in imgs')
                                //- img(src="#{JSON.parse(imgs)[i]}", alt="San Francisco, USA", data-description="Golden Gate Bridge")
                                img(:src="img.img", :alt="img.name" ,:data-description="img.desc")

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
                imgs:{}
            }
        },
        mounted(){

            this.getAllProImg().then((res)=>{
                $('.pgwSlideshow').pgwSlideshow({
                    // transitionEffect:'fading',
                    autoSlide:true
                });
            })
        },
        methods: {
            getAllProImg(){
                // getProById(param.id)
                return getAtlas().then(res=>{
                  this.imgs = res.imgs
                  console.log('imgs:',this.imgs)
                })
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
