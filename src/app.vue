<template>
 <div id="header">
    <input class="search" type="text" placeholder="Search by tags"></t>
      <a class="logo" v-link="{ path: '/home' }"><i class="ion-scissors"></i> CODES-CARDS</a>
    </div>

    <div id="content">
      <router-view></router-view>
    </div>
</template>