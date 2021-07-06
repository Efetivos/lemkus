## Time: 179h00
Data: 15:50  | 07.06  
Daily: -3:00 
  
![Screenshot](./cover.png) (https://github.com/Efetivos/lemkus)


### ENABLE INTRO
> home_header.css
//toggle INTRO 
.index .header-index__preloader
    @include desk
        //z-index: 999
        //position: fixed
        //left: 0
        //top: 0
        //height: 100vh
        //width: 100vw
        //background: var(--soft)

.index
    @include desk
        //overflow: hidden
        //pointer-events: none

> preloader.js
//toggle INTRO 
if($('body').hasClass('index') && window.innerWidth > 1024) { 
	//intro_home.init() 
	$('.preloader-master').remove() 
}
//intro_home.startIntro()


### Colors:
- ![191919](https://via.placeholder.com/15/191919/000000?text=+) `#191919`
- ![f6f6f6](https://via.placeholder.com/15/f6f6f6/000000?text=+) `#f6f6f6`
- ![fdfbf5](https://via.placeholder.com/15/fdfbf5/000000?text=+) `#fdfbf5`
- ![ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) `#ffffff`
- ![fec333](https://via.placeholder.com/15/fec333/000000?text=+) `#fec333`
- ![e6cac6](https://via.placeholder.com/15/e6cac6/000000?text=+) `#e6cac6`
- ![bf2020](https://via.placeholder.com/15/bf2020/000000?text=+) `#bf2020`

###	 Infos site
```bash 

\:root
	--gap: 2.5rem
	--dark: #191919
	--gray: #f6f6f6
	--soft: #fdfbf5
	--white: #ffffff
	--color: #fec333
	--pink: #e6cac6
	--red: #bf2020
	--dharma: 'DharmaGothicE-Bold', condensed, sans-serif
	--dharmaex: 'DharmaGothicE-ExBold', condensed, sans-serif
	--sans: 'OpenSans-Regular', sans-serif
	--openbold: 'OpenSans-Bold', sans-serif
	--opensemi: 'OpenSans-SemiBold', sans-serif
	--reco: 'RecoletaAlt-Regular', serif
	--recosemi: 'RecoletaAlt-SemiBold', serif
	--recomed: 'RecoletaAlt-Medium', serif
	--serif: 'RecoletaAlt-Regular', serif
	@include desk
		--gap: 2.5rem


@mixin dharma
	font-family: var(--dharma)
@mixin dharmaex
	font-family: var(--dharmaex)
@mixin sans
	font-family: var(--sans)
@mixin openbold
	font-family: var(--openbold)
@mixin opensemi
	font-family: var(--opensemi)
@mixin reco
	font-family: var(--reco)
@mixin recosemi
	font-family: var(--recosemi)
@mixin recomed
	font-family: var(--recomed)
@mixin serif
	font-family: var(--serif)


.dharma
	font-family: var(--dharma)
.dharmaex
	font-family: var(--dharmaex)
.sans
	font-family: var(--sans)
.openbold
	font-family: var(--openbold)
.opensemi
	font-family: var(--opensemi)
.reco
	font-family: var(--reco)
.recosemi
	font-family: var(--recosemi)
.recomed
	font-family: var(--recomed)
.serif
	font-family: var(--serif)


```

#### Pages Templates
<ul>
	<li>Home</li>
	<li>Contact</li>
	<li>Shop</li>
	<li>Product</li>
	<li>Blog</li>
	<li>Article</li>
	<li>About</li>
	<li>Search Result</li>
</ul>

#### Pages Customers
<ul>
	<li>Login</li>
	<li>Register</li>
	<li>Account</li>
	<li>Account Informations</li>
	<li>Order Details</li>
	<li>Reset Password (Extra) </li>
</ul>



#### Elements
<ul>
	<li>Menu DropDown</li>
	<li>Launches</li>
	<li>Blog Menu / FS</li>
	<li>Mini Cart / WishList</li>
</ul>



### WishList (Back in Stock)
> https://admin.swymrelay.com/dashboard (Custommize )  
> https://swym.it/help/adding-the-swym-product-view-snippet-to-your-shopify-theme/
> (add-to-cart.liquid)  
```bash
    a(href="#" data-swaction="addToWishlist" data-product-id="{{product.id | json}}").btn-wishlist.btn-hover.cream-v
        span.static WISHLIST
        span.hover(data-hover="WISHLIST      WISHLIST      ") WISHLIST      WISHLIST     
```
> https://swym.it/help/adding-the-wishlist-plus-launch-point-to-your-shopify-sites-header-menu/
```bash
    a(href="#" data-swaction="addToWishlist" data-product-id="{{product.id | json}}").btn-wishlist.btn-hover.cream-v
        span.static WISHLIST
        span.hover(data-hover="WISHLIST      WISHLIST      ") WISHLIST      WISHLIST     
```



### Implemeting Notify App (Back in Stock)
> https://app.backinstock.org/widget/edit (Custommize )  
> https://help.backinstock.org/article/1588-using-a-custom-product-page-button (Add product page)
> (product.liquid)  
```bash
	#BIS_trigger.prod-card__notify.btn-hover
        span.static NOTIFY ME
        span.hover(data-hover="NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      ") NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      

```

> https://help.backinstock.org/article/2331-add-a-back-in-stock-button-to-the-collection-page (Add to Collection)  
> (dropping-card.liquid, dropping-card-inv.liquid)  
```bash
	a(href="#" class="BIS_trigger" data-product-data="{{ product | json | escape }}").dropping-card__notify.btn-hover NOTIFY ME   

```



### Implemeting Filter on Collection (Smart Product Filter & Search)
> Product Layout (left tab) > Product List Layout [ Theme Layout ]  
> collection.liquid (line 32)
```bash
	<div class="products__hold colle-cards">
		{% for product in collection.products %}
			{% render 'product-card' prod: product %}
		{% else %}
	</div>
```

> globo.filter.product.liquid
```bash
{% raw %}

{% assign has_stock = 0 %}
{% assign prod = product %}
{% if prod.variants.size > 1 %}
{% for variant in prod.variants %}
{% if variant.available %}
{% if variant.inventory_quantity != 0 %} {% assign has_stock = variant.inventory_quantity %} {% endif %}
{% else %}
{% endif %}
{% endfor %}
{% else %}
{% endif %}



<div class="prod-card__each {% if prod.metafields.drop.drop_month %}card-drop{% elsif prod.variants.size > 1 %}card-variant{% endif %}">
	<div class="prod-card__hold">



		<div class="prod-card__imgs">


			<a class="prod-img" href="{{ prod.url | within: collection }}">
				<ul class="prod-card__imgs__hold">
					{% for image in prod.images limit: 2 %}
					<li class="prod-card__img__each"> <img class="img-load" src="{{ image.src | escape }}" alt="{{ image.src | escape }}"></li>
					{% endfor %}
				</ul>
			</a>




			<div class="prod-card__img__logo">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="135.5 361.375 420.321 149.8" overflow="visible">
					<path d="M181.865 511.114c-12.524-.497-22.77-3.924-30.782-10.29-1.53-1.215-5.173-4.86-6.395-6.398-3.25-4.086-5.458-8.061-6.931-12.473-4.534-13.579-2.2-31.397 6.673-50.953 7.598-16.742 19.322-33.347 39.776-56.344 3.013-3.384 11.986-13.281 12.044-13.281.021 0-.468.847-1.083 1.879-5.318 8.908-9.87 19.4-12.348 28.485-3.982 14.576-3.502 27.085 1.407 36.784 3.386 6.683 9.19 12.47 15.719 15.67 11.428 5.6 28.16 6.063 48.592 1.355 1.407-.326 71.115-18.83 154.91-41.122 83.793-22.294 152.363-40.52 152.374-40.506.024.02-194.677 83.333-295.749 126.555-16.007 6.844-20.287 8.572-27.812 11.214-19.236 6.755-36.467 9.978-50.395 9.425z" style="stroke-width:2.14451"/>
				</svg>
			</div>


      
			{% if prod.metafields.drop.drop_month %}
        <div class="prod-card__img__date">
          <span>{{ prod.metafields.drop.drop_day }} {{ prod.metafields.drop.drop_month }}</span>
        </div>

			{% elsif prod.compare_at_price_max > prod.price and has_stock > 0 %}
        <div class="prod-card__img__discount">
          <span>{{ prod.compare_at_price_min | minus: prod.price | times: 100.0 |  divided_by: prod.compare_at_price_min | money_without_currency | times: 100 | replace: '.0', ''}}% OFF {{  }}</span>
        </div>
			
      {% elsif has_stock < 1 %}
        <div class="prod-card__soldout"><span>SOLD OUT</span></div>
			{% endif %}



			<div class="sizes">
				{% assign sizes = '' %}
				{% for variant in prod.variants %}
          {% assign sizes = sizes | append: variant.options[0] | append: '_' %}
				{% endfor %}
        
				{% assign sizesArr = sizes | split: '_' | uniq %}
				{% for size in sizesArr %}
          <span class="recosemi">{{ size }}</span>
				{% endfor %}
			</div>

      
		</div>






		<div class="prod-card__infos {% if prod.compare_at_price_max > prod.price %}card-sale{% endif %}">


			<div class="prod-card__title">
				<a class="title-prod dharma" href="{{ prod.url | within: collection }}">{{ prod.title }}</a>
			</div>




			<div class="prod-card__prices">
        <span class="regular-price">{{ prod.price | money }}</span>
        {% if prod.compare_at_price_max != 0 %}
          <span class="sale-price">{{ prod.compare_at_price_max  | money  }}</span>
        {% endif %}
      </div>


			{% if prod.metafields.drop.drop_month %}
        <div class="prod-card__notify btn-hover">
          <span class="static">NOTIFY ME</span><span class="hover" data-hover="NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      ">NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      NOTIFY ME      </span>
        </div>
			{% endif %}
		</div>




	</div>
</div>
{% endraw %}
```



> CSS
```bash
section.products {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--dark);
    border-bottom: 1px solid var(--dark);
}


div#gf-products {
    display: grid !important;
}

.gf-left #gf-tree {
    width: 33.3vw;
    margin: 0;
}

.gf-left #gf-tree+#gf-grid {
    width: 66.5vw;
    padding: 0;
    margin: 0;
    border-left: 1px solid var(--dark);
}

section.products {
    justify-content: space-between;
    border-top: 1px solid var(--dark);
}

#gf-grid .colle-cards {
    grid-template-columns: repeat(2,33.4vw);
}

.gf-filter-contents {
    padding: 0 2.9rem;
}

.gf-block-title h3 {
    position: relative;
    display: flex;
    justify-content: space-between;
}

span.gf-Checkbox {
    border-radius: 50%;
}

.checked .gf-Checkbox {
    background-size: 105%;
}

.gf-scroll.gf-block-scroll::-webkit-scrollbar-thumb, body>#gf-tree .gf-filter-contents::-webkit-scrollbar-thumb {
    background: var(--color);
}

.globo-selected-items-wrapper {
    padding: 1rem 2.9rem;
}

.gf-block-title.hidden-xs h3 span {
    padding: 2rem 0;
    font-family: var(--dharma);
    font-size: 4rem;
}

a.gf-refine-toggle.hidden-xs {
    font-family: var(--recosemi);
    margin: 1rem 0 0;
    font-size: 1.6rem;
    text-decoration: underline;
    text-transform: uppercase;
}

#gf-tree .gf-label {
    font-size: 1.1rem;
}

.gf-block-title span {
    font-size: 1.6rem;
    font-family: var(--recosemi);
}

.gf-option-block {
    border-bottom: 1px solid var(--dark);
}

.gf-left #gf-tree .globo-selected-items-wrapper .globo-selected-items {
    border-bottom: 1px solid var(--dark);
}

span.gf-count {
    font-size: 1.2rem;
}

.selected-item.gf-option-label span {
    font-size: 1.1rem;
    color: var(--soft);
}

#gf-tree .selected-item.gf-option-label {
    background: var(--dark);
    border-radius: 50px;
}

.selected-item.gf-option-label a {
    padding: 0.7rem 1.5rem;
}

.gf-filter-contents span.gf-label {
    font-size: 1.4rem !important;
}


#gf-tree a {
    font-size: 1.4rem;
}
div#gf-controls-container {
    margin: 0;
    padding: 0;
    padding: 2rem var(--gap) 0;
}

.gf-actions {
    margin: 0;
    padding: 0;
}



.theme-store-id-380.spf-layout-theme #gf-products, .theme-store-id-679.spf-layout-theme #gf-products, .theme-store-id-796.spf-layout-theme #gf-products {
    margin: 0;
}


input.gf-controls-search-input {
    font-size: 1.4rem;
    font-family: var(--reco);
    border: none;
    background: none;
    border-bottom: 1px solid var(--dark);
}

button.gf-controls-search-button {
    margin: 0;
}


button.gf-controls-search-button {
    margin: 0 0 0 -0.8rem;
}


span.gf-summary {
    font-size: 1.4rem;
}

.sort-by.limit-by.hidden-xs {
    font-size: 1.6rem;
    background: transparent;
}

select#setLimit {
    font-size: 1.6rem;
    font-family: var(--reco);
}

.sort-by {
    font-size: 1.6rem;
    background: transparent;
}

label.sort-by-toggle {
    font-size: 1.6rem;
}


@media only screen and (max-width:1024px) {
    #gf-grid .colle-cards {
        grid-template-columns: 1fr 1fr;
    }

    div#gf-products {
        margin: 1.9rem 0 0 -1px !important;
        width: calc(100vw + 3px)!important;
    }

    main.main-collection {
        overflow: hidden;
    }
}

@media only screen and (min-width: 580px) and (max-width: 1024px) {
    #gf-grid .colle-cards {
        grid-template-columns: repeat(2,33.4vw) ;
    }
    .theme-store-id-380.spf-layout-theme #gf-products, .theme-store-id-679.spf-layout-theme #gf-products, .theme-store-id-796.spf-layout-theme #gf-products {
        margin-left: 0px !important;
    }
}



/******** NOTIFY  ********/
a.BIS_trigger.btn-hover {
    justify-content: center;
}


/******** WISHLIST ********/
.swym-ui-component .swym-wishlist-container-title-bar {
    background: var(--dark) !important;
}

span.swym-user-text.swym-value.swym-value-1 {
    color: var(--soft) !important;
    text-transform: uppercase !important;
}

.swym-ui-component .swym-simple-wishlist-modal .swym-modal-content .swym-close-btn {
    display: flex !important;
    justify-content: flex-end !important;
}

h2.swym-wishlist-main-title.swym-heading.swym-heading-1.swym-is-heading {
    font-family: var(--dharma) !important;
    text-transform: uppercase !important;
    color: var(--dark) !important;
    font-size: 4rem !important;
    letter-spacing: 0 !important;
}

.swym-simple-wishlist-container-content {
    background: var(--soft) !important;
}

.swym-ui-component .swym-wishlist-grid {
    max-width: none !important;
    width: 94% !important;
    padding: 0 0 1rem 0 !important;
}

button.swym-delete-btn.swym-nav.swym-nav-1.swym-is-button {
    border: 1px solid var(--dark) !important;
    background: transparent !important;
    border-radius: 50% !important;
    width: 2.1rem !important;
    height: 2.1rem !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item .swym-delete-btn .swym-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item .swym-delete-btn .swym-icon::before {
    font-size: 0.65rem !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item {
    background: transparent !important !important;
    width: 26.3rem !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item .swym-title {
    font-family: var(--dharma) !important;
    text-transform: uppercase !important;
    color: var(--dark) !important;
    text-align: center !important;
    font-size: 3rem !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-image-wrapper {
    width: 14.8rem !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-image-wrapper img {
    width: 14.8rem !important;
    height: 14.8rem !important;
}

button.swym-add-to-cart-btn.swym-button.swym-button-1.swym-is-button.swym-bg-2.swym-color-4.swym-is-button {
    background: var(--color) !important;
    font-family: var(--recosemi) !important;
    color: var(--dark) !important;
    border: 1px solid var(--dark) !important;
    border-radius: 20px !important;
    font-size: 1.2rem !important;
    padding: 0.5rem 1rem !important;
}

.swym-ui-component .swym-product-price .swym-product-final-price {
    display: none !important;
}

a.swym-wishlist-item.swym-is-anchor {
    padding: 1.3rem 0 !important;
}

.swym-ui-component .swym-modal {
}

.swym-ui-component .swym-simple-wishlist-modal .swym-modal-content {
    max-width: 83% !important;
}


.swym-ui-component .swym-wishlist-grid .swym-wishlist-item .swym-variant-title {
    font-family: var(--recosemi) !important;
    font-size: 1.4rem !important;
}

.swym-ui-component .swym-wishlist-detail-separator {
    background: var(--dark) !important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item {
    background: transparent !important;
    margin: 0 1.7rem 1.9rem 0 !important;
    width: 25.33rem!important;
}

.swym-ui-component .swym-wishlist-grid .swym-wishlist-item:nth-child(4n) {
    margin-right: 0 !important;
}

```
