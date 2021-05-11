- [Using Schemas ](#using-schemas)
    - [Sections](##sections)
    - [Images](###images)
    - [Text](###text)
    - [Text Area](###text-area)
    - [URL](###url)
    - [Collection](###collection)
- [Metafields](#metafields)
- [Utils](#utils)
- [Add To Cart](#add-to-cart)
    - [With quantity](##add-to-cart-with-quantity)


# Using Schemas
> https://shopify.dev/docs/themes/settings



## Sections

### Images
> https://shopify.dev/docs/themes/settings#image-picker  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Header",
        "class": "header-index",
        "settings": [
            {
                "id": "header-img",
                "type": "image_picker",
                "label": "Imagem Header"
            }
        ]
    }
{% endschema %}

img(src="{{ section.settings.header-img | img_url: 'master' }}", alt='')
```



### [Text]
> https://shopify.dev/docs/themes/settings#text  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Header",
        "class": "header-index",
        "settings": [
            {
                "type": "text",
                "type": "textarea",
                "id": "text",
                "label": "text",
                "default": "This is a text",
                "info": "Some info to user",
                "placeholder": "Insert here your text"
            }
        ]
    }
{% endschema %}

span(data-decor="{{ section.settings.text }}") {{ section.settings.text }}
```


### Text Area
> https://shopify.dev/docs/themes/settings#textarea  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Header",
        "class": "header-index",
        "settings": [
            {
                "type": "textarea",
                "id": "textarea",
                "label": "text",
                "default": "This is a text",
                "info": "Some info to user",
                "placeholder": "Insert here your text"
            }
        ]
    }
{% endschema %}

span(data-decor="{{ section.settings.textarea }}") {{ section.settings.textarea }}
```


### URL
> https://shopify.dev/docs/themes/settings#url  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Header",
        "class": "header-index",
        "settings": [
            {
                "id": "url-btn",
                "type": "url",
                "label": "Link Button"
            },
            {
                "id": "text-btn",
                "type": "text",
                "label": "Text Button",
                "default": "SHOP NOW"
            }
        ]
    }
{% endschema %}

a(href="{{ section.settings.url-btn }}") {{ section.settings.text-btn }}
```



### COLLECTION
> https://shopify.dev/docs/themes/settings#collection  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Collection",
        "class": "collection-index",
        "settings": [
            {
                "id": "collection-index",
                "type": "collection",
                "label": "Collection"
            }
        ]
    }
{% endschema %}

{% assign collection = collections[section.settings.collection-index] %}
{% for product in collection.products %}
    {{ collection.title }}
    {{ collection.url }}
    {{ collection.description }}
    img(src="{{ product.featured_image.src | img_url: 'master' }}" alt="{{ product.featured_image.alt | escape }}")
    a(href="{{ product.url | within: collection }}", alt="{{ product.featured_image.alt | escape }}")  {{ product.title }}
    {{ product.price | money }}
    {% unless product.available %}<br><strong>sold out</strong>{% endunless %}
{% endfor %}
```



### BLOG
> https://shopify.dev/docs/themes/settings#blog  
*[section_name].liquid*
```bash
{% schema %}
    {
        "name": "Blog",
        "class": "blog-index",
        "settings": [
            {
                "id": "blog-index",
                "type": "blog",
                "label": "Blog"
            }
        ]
    }
{% endschema %}

{% assign blog = blogs[section.settings.blog-index] %}
{% for article in blog.articles %}
    a(href="{{ article.url }}", title="{{ article.title }}")
    h1 {{ article.title }}
    a(href="{{ article.url }}", title="{{ article.title }}")
    img(src="{{ article.image.src | img_url: 'master' }}" alt="{{ article.title }}")
    p {{ article.content }}
{% endfor %}
```



## - Blocks
> https://shopify.dev/docs/themes/sections#blocks
> https://shopify.dev/docs/themes/liquid/reference/objects/block  
*[section_name].liquid*
```bash 
{% schema %}
    {
        "name": "Collections",
        "class": "content-filter",
        "blocks": [
            {
                "type": "collection",
                "name": "Collection Item",
                "settings": [
                    {
                        "id": "item",
                        "type": "collection",
                        "label": "Collection"
                    }
                ]
            }
        ]
    }
{% endschema %}

{% for block in section.blocks %}
{% assign collection = collections[block.settings.item] %}
a(href="{{ collection.url }}", alt="{{ collection.title }}") {{ collection.title }}
{% endfor %}
```





</br></br></br>
# Metafields

> https://shopify.dev/docs/themes/liquid/reference/objects/metafield  
> https://shopify.dev/docs/admin-api/rest/reference/metafield  
> https://apps.shopify.com/metafields-editor-2  

### Getting JSON
- /admin/blogs/#{id}/articles/#{id}/metafields.json
- https://sleau.myshopify.com/admin/blogs/77362790573/articles/555463573677/metafields.json


### Fecthing fields
> Simple
```bash 
 <p> {{ article.metafields.global.field-name }} </p> //field-name = key
```

> Loop [JSON.string]
```bash 
{% assign img_field = article.metafields.global.img-field %}
{% assign key = 'img0' %}
<ul>
  <li>img0: {{ img_field['img0'] }}</li>
  <li>img1: {{ img_field['img1'] }}</li>
  <li>img2: {{ img_field.['img2'] }}</li>
</ul>

//Using Loop
{%- assign imgs = article.metafields.global.img-field -%}
<ul class="tabs">
    {%- for img in imgs -%}
        <li><h2>{{ img | first }}</h2>{{ img | last }}</li>
    {%- endfor -%}
</ul>
```





</br></br></br>
# Utils

### Get second image of product
```bash 
a(href="{{ product.url | within: collection }}")
    img(src="{{ product.featured_image.src | img_url: 'master' }}" alt="{{ product.featured_image.alt | escape }}")
    |   {% if product.images.size == 1 %} 
    |   {% assign my_product_image =  product.images[0] %}
    |   {% else %}
    |   {% assign my_product_image =  product.images[1] %}
    |   {% endif %}
    img(src="{{ my_product_image | img_url: 'master' }}", alt="{{ product.featured_image.alt | escape }}")
```

### Show available Sizes
```bash 
.sizes
    |   {% assign sizes = '' %}
    |   {% for variant in product.variants %}
    |   {% if variant.available %}
    |   {% assign sizes = sizes | append: variant.options[0] | append: '_' %}
    |   {% endif %}
    |   {% endfor %}

    |   {% assign sizesArr = sizes | split: '_' | uniq %}

    |   {% for size in sizesArr %}
    |   <span>{{ size }}</span>
    |   {% endfor %}
```






</br></br></br>
# Add to Cart

### Single Button 
> *product-card.liquid (snippet)*  
> {% render 'add-to-cart' %}
```bash
<form method="post" action="/cart/add">
  <input type="hidden" name="id" value="{{ product.variants.first.id }}" />
  <input min="1" type="number" id="quantity" name="quantity" value="1"/>
  <input type="submit" value="Add to cart" class="btn" />
</form>
```



### Separated Variants - Inputs
> *add-to-cart.liquid (snippet)*  
> {% render 'add-to-cart' %}
```bash
form(action="/cart/add" method="post" enctype="multipart/form-data" id="AddToCartForm")
    |   {% if product.variants.size > 1 %}
    |   {% for variant in product.variants %}
    |   {% if variant.available %}
    fieldset.fieldset-var
        input(type="radio", name="id" id="variant-{{ forloop.index }}" value="{{ variant.id }}")
        label(for="variant-{{ forloop.index }}") {{ variant.title }}
    |   {% else %}
    fieldset.fieldset-var
        input(type="radio" disabled="disabled").disabled
        label(for="variant-{{ forloop.index }}") {{ variant.title }}
    |   {% endif %}
    |   {% endfor %}
    |   {% else %}
    input(type="hidden" name="id" value="{{ product.variants.first.id }}")
    |   {% endif %}

    //- _______ btn add to cart
    button(type="submit" name="add" id="AddToCart").e-color.t-white ADD TO YOUR BAG
```
> style
```bash
form fieldset input[type="radio"] {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip-path: inset(1px, 1px, 1px, 1px);
}

fieldset {
    display: inline-block;
    font-size: 2.8rem;
}

form fieldset input:checked + label {
    color: red;
}

input.disabled + label {
    opacity: .2;
    pointer-events: none;
}

label {
    cursor: pointer;
}
```


### Add to cart with quantity
> *add-to-cart.pug*  
```bash
form(action="/cart/add" method="post" enctype="multipart/form-data" id="AddToCartForm")


    //- =========================  variants  ========================= -//
    |   {% if product.variants.size > 1 %}
    |   {% for variant in product.variants %}
    |   {% if variant.available %}
    fieldset.fieldset-var
        input(type="radio", name="id" id="variant-{{ forloop.index }}" value="{{ variant.id }}", data-inventory-qty="{{ variant.inventory_quantity }}", class="{% unless variant.available %}disabled{% endunless %}").js-variant-radio
        label(for="variant-{{ forloop.index }}") {{ variant.title }}
    |   {% else %}
    fieldset.fieldset-var
        input(type="radio" disabled="disabled").disabled
        label(for="variant-{{ forloop.index }}") {{ variant.title }}
    |   {% endif %}
    |   {% endfor %}
    |   {% else %}
    input(type="hidden" name="id" value="{{ product.variants.first.id }}")
    |   {% endif %}


    


    //- =========================  quantity  ========================= -//
    fieldset 
        span Quantity
        <input class="js-qty-field" type="number" id="Quantity" name="quantity" value="1" min="1" {% if product.variants.size == 1 %} max="{{ product.variants.first.inventory_quantity }}" {% endif %}>
        button(type="button", disabled="disabled").js-qty-btn.disabled.quantity-button.minus -
        span.quantity-text.js-qty-text 1
        button(type="button").js-qty-btn.quantity-button.plus +

        

    //- =========================  add to cart  ========================= -//
    div
        //- _______ btn add to cart
        <button class="e-color t-white {% if product.variants.size > 1 %}disabled{% endif %}" type="submit" name="add" id="add-to-cart-button"> ADD TO YOUR BAG </button>
```

> *add-to-cart.js*  
```bash

import { gsap } from 'gsap'
class AddToCart {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.onClick()
    }


    changeVal(val, $minus_btn, $qty_text){
        val < 2 ? $minus_btn.prop('disabled', true).addClass('disabled') : $minus_btn.prop('disabled', false).removeClass('disabled')
        $qty_text.text(val)
    }
    

    //? - =========================  ONCLICK  ========================= -//
    //? - =========================  ONCLICK  ========================= -//
    onClick(){
        let that = this
        this.qty_btns = this.qsa('.js-qty-btn')
        this.qty_fields = this.qsa('.js-qty-field')
        this.variant_radio = this.qsa('.js-variant-radio')



        
        //_____ click btn qty
        $(this.qty_btns).click(function(){
            let $button = $(this),
                $form = $button.closest('form'),
                $qty_field = $form.find('.js-qty-field'),
                $qty_text = $form.find('.js-qty-text'),
                $minus_btn = $form.find('.minus'),
                qty_value = parseInt($qty_field.val()),
                max = $qty_field.attr('max') ? parseInt($qty_field.attr('max')) : null


                // this is minus btn
                if($button.hasClass('minus')) {
                    $qty_field.val(qty_value - 1)
                    that.changeVal(parseInt($qty_field.val()), $minus_btn, $qty_text)
                }
                
                // this is plus btn
                if($button.hasClass('plus') && (max === null || qty_value+1 <= max)) {
                    $qty_field.val(qty_value + 1)
                    that.changeVal(parseInt($qty_field.val()), $minus_btn, $qty_text)
                }
        });




        //_____ change input qty
        $(this.qty_fields).change(function(){
            let $form = $(this).closest('form'),
            $qty_text = $form.find('.js-qty-text'),
            $minus_btn = $form.find('.minus'),
            this_value = parseInt($(this).val())
            that.changeVal(this_value, $minus_btn, $qty_text)
        });



        //_____ click variants
        $(this.variant_radio).change(function(){
            let $radio = $(this),
                $form = $(this).closest('form'),
                $qty_field = $form.find('.js-qty-field'),
                $add_to_cart = $form.find('#add-to-cart-button'),
                max = $radio.data('inventory-qty')

                $add_to_cart.hasClass('disabled') ? $add_to_cart.removeClass('disabled') : null
                if($add_to_cart.prop)
                $qty_field.attr('max', max)
                if(parseInt($qty_field.val()) > max) {
                    $qty_field.val(max).change();
                }
        });
    }
}
export const add_to_cart = new AddToCart()
```

> *add-to-cart.sass*  
```bash
#AddToCartForm

    fieldset.fieldset-var
        display: inline-block

    
    fieldset input[type="radio"]:checked + label
        color: var(--color)
        border-bottom: 1px solid var(--color)


    input[type="radio"]
        @include not-visible



    input.disabled + label
        opacity: .2
        pointer-events: none


    label
        font-size: 2.8rem
        cursor: pointer


.disabled
    border: 1px solid red
    pointer-events: none
    opacity: 0.2
```

## Cart
> Raw versio  
*cart.pug*
```bash
.page.page-cart(data-ispage="cart", data-scroll-content)
    .page-cart__content
        |   {% render 'cart-content' %}
```


*cart-content.pug*
```bash
|   {% if cart.item_count > 0 %}
form(action="/cart" method="post" novalidate).cart
    //- _________________ each item
    |   {% for item in cart.items %}
    .cart__each
        |   {% render 'cart-item' item:item forloop:forloop %}
    |   {% endfor %}

    .cart__infos
        p sub total : {{ cart.total_price | money }}
        button(type="submit" name="update")  Update
        button(type="submit" name="checkout") Checkout



|   {% else %}

span.your-bag Your bag is empty
a(href="{{ shop.url }}") BROWSE NEW IN

```


*cart-item.pug*
```bash
//- ___img
a(href="{{ item.url | within: collections.all }}").item-img
    img(src="{{ item | img_url: 'medium' }}" alt="{{ item.title | escape }}")

//- ___title
a(href="{{ item.url }}").item-title {{ item.product.title }}

//- ___variant
p.item-var {{ item.variant.title }}

//- ___remove
a(href="/cart/change?line={{ forloop.index }}&amp;quantity=0").item-remove REMOVE

//- ___price
p.item-price {{ item.price | money }}

//- ___qty input
input(type="number" name="updates[]" id="updates_{{ item.key }}" value="{{ item.quantity }}" min="0")

//- ___price with discount
|   {% if item.original_line_price != item.line_price %}
p.item-price-dis {{ item.original_line_price | money }}
|   {% endif %}


//- ___total item price
p.item-total-price {{ item.line_price | money }}

//- ___ if discount
|   {% for discount in item.discounts %}{{ discount.title }}{% endfor %}
```