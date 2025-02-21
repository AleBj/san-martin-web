<template lang="">
  <header>
    <div :class="$style.container">
    <Logo />
    <nav v-if="isOpen">
      <ul>
        <li @click="close">
          <nuxt-link to="/ciudad/">CIUDAD</nuxt-link>
        </li>
        <li :class="[$style.drp, subMenu && $style.subMenu]" @click="openSubmenu">
          <nuxt-link to="">PROGRAMAS 
            <svg width="10" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00493 4.86088L10.5419 0.32188C10.6213 0.242089 10.7156 0.178771 10.8196 0.135564C10.9235 0.0923571 11.0349 0.0701141 11.1474 0.0701141C11.26 0.0701141 11.3714 0.0923571 11.4753 0.135564C11.5792 0.178771 11.6736 0.242089 11.7529 0.32188C11.9126 0.48375 12.0022 0.701993 12.0022 0.92938C12.0022 1.15677 11.9126 1.37501 11.7529 1.53688L6.61493 6.67988C6.45889 6.83555 6.24881 6.92504 6.02845 6.92969C5.80808 6.93435 5.59441 6.85382 5.43193 6.70488L0.25293 1.53888C0.0915462 1.37829 0.000565234 1.16017 2.6248e-06 0.932502C-0.000559984 0.704833 0.0893416 0.486265 0.24993 0.324881C0.410519 0.163496 0.62864 0.0725154 0.856309 0.0719528C1.08398 0.0713902 1.30255 0.161292 1.46393 0.32188L6.00493 4.86088Z" fill="currentColor"/>
            </svg>
          </nuxt-link>
          <div :class="$style.dropDown" @click="close">
            <nuxt-link v-for="(p, index) in desplegable" :key="`p-${index}`" :to="`/${p.type}/${p.uid}`">{{ $prismic.asText(p.data.titulo) }}</nuxt-link>
          </div>
        </li>
        <li @click="close">
          <nuxt-link to="/transparencia/">TRANSPARENCIA</nuxt-link>
        </li>
        <li @click="close">
          <nuxt-link to="/institucional/">INSTITUCIONAL</nuxt-link>
        </li>
      </ul>
      <div :class="$style.navIcons" @click="close">
        <!-- <a href="http://radio.sanmartin.gov.ar" target="_blank" :class="$style.icon">
          <svg width="37" height="27" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V11" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M3.44312 5.9668V14.0048" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M5.88501 1V15" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M10.771 7V13" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M13.2129 5V12" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M8.32788 5V14" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M15.656 3V12" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M18.0991 6.49023V11.2632" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M20.541 5V11" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M22.9839 5V11" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M27.8689 6V12" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M25.427 5V11" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M30.312 3V12.972" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M32.7539 4V14" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M35.197 1V13.875" stroke="#00ADEE" stroke-width="0.75"/>
            <path d="M10.92 20.14C10.92 20.7133 10.7933 21.1733 10.54 21.52C10.2867 21.86 9.92333 22.07 9.45 22.15L11.41 25.5H10.19L8.5 22.34H6.99V25.5H5.97V18H8.51C9.33 18 9.93667 18.1767 10.33 18.53C10.7233 18.8767 10.92 19.4133 10.92 20.14ZM9.86 20.18C9.86 19.7133 9.75333 19.3833 9.54 19.19C9.32667 18.99 8.98333 18.89 8.51 18.89H6.99V21.53H8.47C8.95667 21.53 9.31 21.4267 9.53 21.22C9.75 21.0133 9.86 20.6667 9.86 20.18ZM17.4011 25.5L16.8011 23.71H13.5011L12.9011 25.5H11.8011L14.5611 18H15.7811L18.5511 25.5H17.4011ZM15.1611 18.75L14.9111 19.53L13.8011 22.82H16.5111L15.4211 19.53L15.1911 18.75H15.1611ZM25.5005 21.72C25.5005 23.06 25.2405 24.0267 24.7205 24.62C24.2005 25.2067 23.3905 25.5 22.2905 25.5H19.7005V18H22.2705C23.4105 18 24.2338 18.2933 24.7405 18.88C25.2471 19.46 25.5005 20.4067 25.5005 21.72ZM24.4305 21.72C24.4305 20.6667 24.2671 19.9433 23.9405 19.55C23.6138 19.1567 23.0538 18.96 22.2605 18.96H20.7205V24.55H22.2705C23.0438 24.55 23.5971 24.3533 23.9305 23.96C24.2638 23.56 24.4305 22.8133 24.4305 21.72ZM27.1935 25.5V18H28.2435V25.5H27.1935ZM36.1459 21.75C36.1459 23.1367 35.9059 24.1333 35.4259 24.74C34.9526 25.34 34.1593 25.64 33.0459 25.64C31.9393 25.64 31.1426 25.3367 30.6559 24.73C30.1759 24.1167 29.9359 23.1233 29.9359 21.75C29.9359 20.3767 30.1759 19.39 30.6559 18.79C31.1359 18.1833 31.9326 17.88 33.0459 17.88C34.1593 17.88 34.9526 18.18 35.4259 18.78C35.9059 19.38 36.1459 20.37 36.1459 21.75ZM35.0759 21.75C35.0759 20.9833 35.0059 20.39 34.8659 19.97C34.7326 19.5433 34.5226 19.2467 34.2359 19.08C33.9559 18.9133 33.5593 18.83 33.0459 18.83C32.2926 18.83 31.7659 19.0367 31.4659 19.45C31.1659 19.8567 31.0159 20.6233 31.0159 21.75C31.0159 22.87 31.1659 23.64 31.4659 24.06C31.7659 24.4733 32.2926 24.68 33.0459 24.68C33.7993 24.68 34.3259 24.4733 34.6259 24.06C34.9259 23.64 35.0759 22.87 35.0759 21.75Z" fill="#282828"/>
          </svg>
        </a> -->
        <a href="https://mapa.sanmartin.gov.ar/" target="_blank" :class="$style.icon">
          <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6639 2.79282C12.5284 1.6821 11.0886 0.932473 9.52658 0.638694C7.96454 0.344915 6.3502 0.520171 4.88789 1.14231C3.42557 1.76445 2.18076 2.80552 1.31081 4.13398C0.440859 5.46244 -0.0151173 7.01866 0.000382421 8.60589C0.000382421 14.9011 7.44425 21.9433 7.76151 22.2399L8.03905 22.5L8.31659 22.2399C8.63304 21.9433 16.0777 14.9011 16.0769 8.61237V8.44545C16.0689 7.39072 15.8515 6.34803 15.4373 5.37776C15.023 4.40749 14.4204 3.5289 13.6639 2.79282ZM14.3129 8.60589C14.3129 13.4255 9.28212 18.7168 8.03984 19.95C6.79432 18.7143 1.76683 13.4255 1.76683 8.60589C1.76683 7.78324 1.9292 6.96862 2.24445 6.20858C2.5597 5.44855 3.0217 4.75797 3.6042 4.17627C4.18671 3.59456 4.8782 3.13316 5.63928 2.81834C6.40036 2.50353 7.21605 2.34148 8.03984 2.34148C8.86363 2.34148 9.67933 2.50353 10.4404 2.81834C11.2015 3.13316 11.8932 3.59456 12.4757 4.17627C13.0582 4.75797 13.5202 5.44855 13.8354 6.20858C14.1507 6.96862 14.3129 7.78324 14.3129 8.60589Z" fill="#282828"/>
            <path d="M8.03907 4.39717C6.92002 4.39717 5.84678 4.84112 5.05549 5.63131C4.26421 6.4215 3.81975 7.49322 3.81975 8.61072C3.81975 9.72822 4.26421 10.7999 5.05549 11.5901C5.84678 12.3803 6.92002 12.8243 8.03907 12.8243H8.11058C8.65417 12.8254 9.19175 12.7122 9.68864 12.492C10.4442 12.158 11.0881 11.6149 11.5442 10.927C12.0004 10.239 12.2497 9.43493 12.2625 8.60993C12.261 7.49226 11.8155 6.42087 11.0236 5.63101C10.2318 4.84116 9.15828 4.39739 8.03907 4.39717ZM10.4953 8.61072C10.4951 9.09579 10.3509 9.56995 10.0809 9.9732C9.81089 10.3764 9.42727 10.6907 8.97845 10.8762C8.52964 11.0617 8.03586 11.1102 7.55947 11.0154C7.08307 10.9207 6.64555 10.687 6.30213 10.344C5.95871 10.0009 5.72488 9.56389 5.63018 9.08812C5.53547 8.61235 5.58411 8.11923 5.77004 7.67109C5.95596 7.22296 6.27066 6.83992 6.67456 6.57044C7.07845 6.30096 7.55332 6.15713 8.03907 6.15713C8.68945 6.1582 9.31296 6.41641 9.77323 6.87529C10.2335 7.33416 10.4932 7.95639 10.4953 8.60587V8.61072Z" fill="#282828"/>
          </svg>
        </a>
        <a href="https://api.whatsapp.com/send?phone=5491122866544&text=Quiero%20sumarme!" target="_blank" :class="$style.icon">
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.7051 3.69135C16.8345 1.82202 14.3487 0.696177 11.7102 0.523332C9.07176 0.350487 6.46038 1.14242 4.36206 2.75175C2.26375 4.36108 0.821442 6.67818 0.303555 9.27183C-0.214333 11.8655 0.22748 14.559 1.54677 16.8511L0 22.5L5.78008 20.9824C7.37849 21.854 9.17019 22.3101 10.9907 22.3087H10.9958C13.8964 22.3082 16.6796 21.1623 18.7402 19.1203C20.8009 17.0782 21.9723 14.3051 22 11.4037C21.9845 9.96467 21.6855 8.54278 21.1201 7.21942C20.5548 5.89605 19.7341 4.69717 18.7051 3.69135ZM10.9949 20.4712C9.3709 20.4724 7.77651 20.0361 6.37915 19.2084L6.05 19.012L2.62308 19.9109L3.53608 16.5659L3.32031 16.2223C2.59576 15.0282 2.15635 13.683 2.03626 12.2914C1.91617 10.8997 2.11864 9.49915 2.62792 8.19855C3.1372 6.89794 3.93956 5.73239 4.97259 4.79253C6.00562 3.85268 7.24148 3.16388 8.58403 2.77969C9.92659 2.3955 11.3396 2.32629 12.7133 2.57743C14.087 2.82858 15.3842 3.39331 16.5041 4.22771C17.6239 5.06211 18.5363 6.14368 19.1702 7.38829C19.8041 8.63291 20.1424 10.007 20.1588 11.4037C20.1331 13.8178 19.1563 16.1242 17.4405 17.822C15.7246 19.5198 13.4084 20.4718 10.9949 20.4712ZM15.9644 13.6831C15.6945 13.546 14.3567 12.8875 14.1028 12.7986C13.849 12.7097 13.6705 12.6615 13.4894 12.9357C13.3083 13.2099 12.7871 13.8202 12.6255 14.0064C12.4638 14.1926 12.3065 14.2129 12.0332 14.075C10.4641 13.4485 9.15597 12.3048 8.32531 10.8333C8.04523 10.3517 8.60538 10.3864 9.12577 9.34529C9.16102 9.26993 9.17721 9.18706 9.17293 9.10397C9.16865 9.02087 9.14403 8.94011 9.10123 8.86877C9.03269 8.73165 8.48777 7.39011 8.26185 6.84503C8.041 6.31434 7.81508 6.38798 7.64838 6.37867C7.48169 6.36936 7.30992 6.36851 7.128 6.36851C6.99015 6.37229 6.85454 6.40428 6.72953 6.46251C6.60452 6.52074 6.49276 6.60397 6.40115 6.70707C6.09339 6.99936 5.84975 7.35248 5.68573 7.744C5.52171 8.13553 5.44088 8.55689 5.44838 8.98134C5.53875 10.0091 5.92494 10.9887 6.56023 11.8015C7.72953 13.5531 9.33303 14.9713 11.2141 15.9176C12.9428 16.6641 13.6205 16.7284 14.4845 16.6006C14.8638 16.5236 15.223 16.3686 15.5392 16.1454C15.8554 15.9222 16.1218 15.6356 16.3215 15.3039C16.4993 14.8963 16.554 14.4456 16.4788 14.0072C16.4154 13.8837 16.2343 13.816 15.9644 13.6831Z" fill="#282828"/>
          </svg>
        </a>
        <Button :cta="`Trámites`" :link="`/tramites`" :class="$style.button" />        
      </div>
    </nav>
    <div :class="[$style.lupa, buscan && $style.open]" @click="busca()">
      <svg v-if="!buscan" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0187 15.3083C14.8353 15.3083 16.543 14.6223 17.8274 13.3764C19.1119 12.1308 19.8194 10.4743 19.8194 8.712C19.8194 6.94972 19.1119 5.29321 17.8271 4.04732C16.5428 2.80151 14.8352 2.11541 13.0187 2.11541C11.2021 2.11541 9.49404 2.80158 8.20938 4.04743C6.96707 5.2524 6.26052 6.85423 6.21988 8.55786C6.17937 10.2562 6.80229 11.8822 7.97391 13.1362L8.45429 13.6504L9.02587 14.0536C10.1894 14.8744 11.5701 15.3083 13.0187 15.3083ZM1.31616 22L0 20.7246L6.35813 14.5568C3.16395 11.1379 3.26702 5.8498 6.66756 2.5515C10.1755 -0.850502 15.8621 -0.8505 19.369 2.5515C22.877 5.95309 22.877 11.4709 19.369 14.8725C16.2017 17.9448 11.2558 18.2423 7.74339 15.7645L1.31616 22Z" fill="#282828"/>
      </svg>
      
      <svg v-else width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L17.5 17.5" stroke="#282828" stroke-width="2"/>
        <path d="M1 17.5L17.5 0.999999" stroke="#282828" stroke-width="2"/>
      </svg>
    </div>
    <Burger v-if="isMobile" @click="open" :isOpen="isOpen" />
    </div>
    <Buscador :busca="buscan" />
  </header>  
</template>
<script>
import { gsap } from 'gsap'
export default {
  name: 'Header',
  data() {
    return {
      programas:[],
      comunidades:[],
      desplegable:[],
      isMobile:false,
      subMenu:false,
      isOpen:false,
      buscan:false
    }
  },  
  mounted() {
    this.isMobile = window.innerWidth <= 800;
    this.isMobile ? this.isOpen = false : this.isOpen = true
  },
  async fetch(){
    this.programas = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'programas')).then( response => {
      return response.results
    });
    this.comunidades = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'comunidades')).then( response => {
      return response.results
    });

    this.desplegable = this.programas.concat(this.comunidades);

    this.desplegable.sort(function (a, b) {
      if (a.uid > b.uid) {
        return 1;
      }
      if (a.uid < b.uid) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    //console.log(this.desplegable)

  },
  methods: {
    openSubmenu(){
      this.subMenu = !this.subMenu
    },
    open(){
      if(this.isMobile){
        this.isOpen = !this.isOpen
        //document.querySelector('body').classList.add('open-menu-overflow')
      }
    },
    close(){
      if(this.isMobile){
        gsap.fromTo(document.querySelector('nav'),{opacity:1},{opacity:0,duration:.4,delay:.4,ease:'Power3.inOut',onComplete:()=>{
          this.isOpen = !this.isOpen
          //document.querySelector('body').classList.remove('open-menu-overflow')
        }})
      }      
    },
    busca(){
      this.buscan = !this.buscan
    }
  }
  
}
</script>
<style module lang="scss">
header{
  background:white;
  border-bottom: 1px solid #e3e3e3;
  position: sticky;
  top:0;
  z-index: 99;
  }
  .container{
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding:  20px 50px;
    width: 100%;
    @media (max-width:800px){
      padding: 10px 15px;
    }
  }
  nav{
    display: flex !important;
    align-items: center;
    justify-content:space-between;
    width: calc(100% - 270px);
    & > ul{
      padding: 0;
      list-style: none;
      li{
        display: inline-block;
        font-size: 12px;
        margin-right: 40px;
        position:relative;
        white-space: nowrap;
        padding: 10px 0;
        &.drp{
          display: inline-flex;
          align-items: center;
          & svg{margin-left: 4px;}
          &:before{
            content: '';
            position: fixed;
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(3px);
            top:84px;left:0;
            pointer-events: none;
            transition: ease-in-out 0.4s;
            opacity: 0;
          }
        }
        & .dropDown{
          position: absolute;
          z-index: 4;
          background: #fff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.051);
          border-radius: 20px;
          padding: 15px 30px;
          top:100%;
          font-size: 13px;
          left: -20px;
          min-width: 130px;
          a{display: block;padding: 10px 0;color:$black}
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: ease-in-out 0.4s;
          column-count: 3;
        }
        &:hover{color:$blue}
        &:hover .dropDown{
          pointer-events: all;
          opacity: 1;
          transform: translateY(0);
        }
        &:hover:before{opacity: 1;}
      }
    }
    @media (max-width:800px) {
      position: absolute;
      display: block !important;
      width: 100vw;
      height: calc(100vh - 64px);
      overflow-y:scroll;
      top: 57px;left: 0;
      background-color: white;
      & > ul{
        padding: 20px 16px;
        li{
          display: block;
          font-size: 16px;
          margin-right: 0px;
          text-align: center;
          padding: 16px 0;
          border-bottom: 1px solid $blue;
          &.drp{
            text-indent: 10px;
            display:flex;
            justify-content: center;
            flex-wrap: wrap;
            overflow: hidden;
            height: 52px;
            transition: ease-in-out 0.4s;
            & svg{margin-left: 4px;transform: translateY(-2px);}
            &:before{display: none;visibility: hidden;}
            &.subMenu{
              height: auto;
            }
          }
          & .dropDown{
            position: static;
            box-shadow: none;
            border-radius: 0px;
            margin:20px 0;
            padding: 0px 30px;
            font-size: 14px;
            min-width: 100%;
            a{display: block;padding: 10px 0;color:$black}
            opacity: 1;
            transform: translateY(00px);
            pointer-events: initial;
            column-count: 1;
          }
          &:hover{color:$black}
          &:hover:before{display: none;}
        }
      }
    }
  }
  .navIcons{
    display: flex;
    align-items: center;
    margin: 0 16px;
    margin-right: 0;
    .icon{
      margin: 0 8px;
    }
    .button{margin-left: 10px;
      & a{height: 40px !important;}
    }
    @media (max-width:800px) {
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 16px;
      margin-left: 0;
      .icon{
        margin: 0 12px;
        order:1
      }
      .button{
        width: 100%;
        margin-left: 0px;
        text-align: center;
        margin-bottom: 20px;
        & a{height: 40px !important;width: 100%;}
      }
      
    }
  }
  .lupa{
    cursor: pointer;
    position: relative;
    z-index: 99;
    @media (max-width:800px) {
      margin-left: auto;
      margin-right: 10px;
      &.open{
        transform: translateX(40px);
      }
    }
  }
</style>