/*
?Public routes
TODO:  all products       @get      notprotected
TODO:  one product        @get      notprotected     with reviews
TODO:  order              @post     notprotected
TODO:  register           @post     notprotected
TODO:  login              @post     notprotected
TODO:  profile            @get      protected
TODO:  any user profile   @get      protected
TODO:  any user profile   @update   protected
=================================================================
?Admin routes

  !admin

TODO:  protected admin auth //done

  !users
TODO: all users            @get        ADMINPROTECTED
TODO:  :user               @get        ADMINPROTECTED
TODO:  :user               @put        ADMINPROTECTED
TODO:  :user               @delete     ADMINPROTECTED

  !reviews
TODO:  all reviews         @get        ADMINPROTECTED
TODO:  :reviews            @get        ADMINPROTECTED
TODO:  :review             @delete     ADMINPROTECTED

  !products
TODO:  all orders          @get        ADMINPROTECTED 
TODO:  :order              @get        ADMINPROTECTED
TODO:  :order              @update     ADMINPROTECTED

TODO:  all products        @get        ADMINPROTECTED //done
TODO:  :product            @get        ADMINPROTECTED //done
TODO:  :product            @post       ADMINPROTECTED //done
TODO:  :product            @delete     ADMINPROTECTED //done
TODO:  :product            @update     ADMINPROTECTED


 ================================================================

  !FRONT END
TODO:  landing screen
TODO:  login screen
TODO:  regiser screen
TODO:  products
TODO:  single product
TODO:  profile
TODO:  any profile
TODO:  add order
TODO:  my orders



==================================================================
!-root
?-->landing
?-->login
?-->register
?-->profile
?-->products
     -> singleproduct
                     --> order
?-->any profile

!-->admin
?----> products (delete)
     -> edit product
     -> add product
     ?-> orders
     -> edit order
     ?-> reviews
     -> single review
     ?-> users (delete)
     -> edit user




// admin dashboard
// explaining affiliate
// handle 404

//admin user update
