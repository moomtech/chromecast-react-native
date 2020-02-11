<p align="left">
    <img src="/assets/moom.svg" height="35" alt="Moom"/>
</p>

IMPORTANTE: Funciona apenas para televisões com Chromecast built-in ou com Chromecast. Nem todas as televisões são suportadas pois usam tecnologias diferentes. [Saiba mais sobre o Chromecast built-in](https://www.google.com/chromecast/built-in/).

Transmissão de vídeos com Chromecast e React Native utilizando o Google Cast, que é a biblioteca oficial da Google para transmissões. Antes de seguir para as configurações necessárias, é importante ressaltar que até então, não há nada oficial ou um padrão para utilizar o Google Cast com React Native e que a biblioteca e configurações utilizadas são os passos iniciais para tornar o feito algo padronizado. Por último, a biblioteca em questão está em desenvolvimento e não está cobrindo todas as funcionalidades que o Google Cast oferece e, o mais importante, é que você ajude colaborando com novas features e resoluções de problemas.

## Instalação

```sh
yarn add react-native-google-cast
```

ou

```sh
yarn add react-native-google-cast
```

### Configurações

<details>
<summary>iOS</summary>

- Dentro de `ios/NOME-DO-APP/AppDelegate.m` adicione

```obj-c
#import <GoogleCast/GoogleCast.h>
```

- Ainda dentro de `AppDelegate.m` adicione o seguinte trecho de código antes do `return YES;`

```obj-c
GCKDiscoveryCriteria *criteria = [[GCKDiscoveryCriteria alloc] initWithApplicationID:kGCKDefaultMediaReceiverApplicationID];
GCKCastOptions* options = [[GCKCastOptions alloc] initWithDiscoveryCriteria:criteria];
[GCKCastContext setSharedInstanceWithOptions:options];
```

Obs: Para receivers customizados, adicione no lugar do kGCKDefaultMediaReceiverApplicationID seu ApplicationID (ex: @"E038DH47"). Leia mais em [Styled Media Receiver](https://developers.google.com/cast/docs/styled_receiver)

- Dentro da pasta **iOS** no arquivo `Podfile` adicione

```obj-c
pod 'react-native-google-cast/NoBluetooth', path: '../node_modules/react-native-google-cast/ios/'
```

- Por fim, abra a pasta **iOS** no seu terminal e rode o comando

```obj-c
pod install
```

- Tudo pronto. Inicie sua aplicação

```sh
npx react-native run-ios
```

</details>

<details>
<summary>Android</summary>

- Dentro de `android/app/src/main/AndroidManifest.xml` adicione

```xml
<activity android:name="com.reactnative.googlecast.GoogleCastExpandedControlsActivity" />

<meta-data
    android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
    android:value="com.reactnative.googlecast.GoogleCastOptionsProvider" />
```

- Adicione dentro de `android/app/build.gradle`

```xml
implementation "com.google.android.gms:play-services-cast-framework:+"
```

- Dentro de `android/app/src/main/java/com/cast/MainActivity.java` adicione

```java
import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {
  // ..
}
```

IMPORTANTE: Com o emulador do Android Studio, o botão de Google Cast não aparece, e não sei ao certo porque isso ocorre, mas em contrapartida, emulando a aplicação com um dispositivo físico, funciona perfeitamente. Outra forma é utilizar o [scrcpy](https://github.com/Genymobile/scrcpy), que conectando seu dispositivo físico via USB ao computador, você consegue emular seu celular.

Independente da forma como você for emular sua aplicação, inicie sua aplicação com

```sh
npx react-native run-android
```

Caso você deseje customizar seu receiver, siga os passos abaixos:

- Dentro de `android/app/src/main/AndroidManifest.xml` altere o nome `com.reactnative.googlecast.GoogleCastOptionsProvider` para `com.nativecast.CastOptionsProvider` como no exemplo abaixo

```xml
<meta-data
    android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
    android:value="com.nativecast.CastOptionsProvider" />
```

- No caminho `android/app/src/main/java/com/NOME-DO-APP` crie um arquivo chamado `CastOptionsProvider.java` e adicione o trecho de código

```java
package com.nativecast;

import com.reactnative.googlecast.GoogleCastOptionsProvider;
import android.content.Context;
import com.google.android.gms.cast.framework.CastOptions;

public class CastOptionsProvider extends GoogleCastOptionsProvider {
  @Override
  public CastOptions getCastOptions(Context context) {
    CastOptions castOptions = new CastOptions.Builder()
        .setReceiverApplicationId(context.getString(R.string.app_id))
        .build();
    return castOptions;
  }
}
```

- Para finalizar, acesse o arquivo `strings.xml` que fica em `android/app/src/main/res/values/strings.xml` e acrescente uma nova string dentro de `<resources>` com sua app id

```xml
<string name="app_id">E038DH47</string>
```

</details>

### Expanded Controller no Android

Por padrão, o **Expanded Controller** que é a tela que controla a reprodução das mídias, vem diferente no Android e no iOS, não em questão de design, mas sim nos botões e nas cores do título, descrição e botão de cast. No iOS, por padrão, vem os botões (legenda, voltar 30s, play/pause, avançar 30s e volume) e cores branca no cabeçalho. Já no Android, os botões são (legenda, anterior, play/pause, próximo e volume) e o cabeçalho está todo preto, dificultando a visibilidade.

<p align="center">
    <img src="/assets/android.jpg" height="500" alt="Android device by Moom"/>
</p>

<details>
<summary>Como corrigir os botões do Expanded Controller no Android</summary>

- Dentro de `android/app/src/main/res/values` crie um novo arquivo chamado `arrays.xml` e insira o trecho de código abaixo

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <array name="cast_expanded_controller_control_buttons">
        <!-- Para outros botões olhe esse link: https://developers.google.com/cast/docs/android_sender/customize_ui#choose-mini-controller-buttons -->
        <item>@id/cast_button_type_closed_caption</item>
        <item>@id/cast_button_type_rewind_30_seconds</item>
        <item>@id/cast_button_type_forward_30_seconds</item>
        <item>@id/cast_button_type_mute_toggle</item>
    </array>
</resources>
```

- Por fim, dentro da pasta `values`, também tem um arquivo chamado `styles.xml`. Adicione o seguinte trecho de código dentro de `<resources>`

```xml
<style name="CustomCastExpandedController" parent="CastExpandedController">
    <item name="castControlButtons">@array/cast_expanded_controller_control_buttons</item>
</style>
```

E no `<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">` adicione

```xml
<item name="castExpandedControllerToolbarStyle">@style/ThemeOverlay.AppCompat.Dark.ActionBar</item>
<item name="castExpandedControllerStyle">@style/CustomCastExpandedController</item>
```

</details>

### Links que você pode querer ler

Para informações mais detalhadas sobre problemas de compatibilidade, usabilidade, APIs, consulte o repositório oficial do projeto: [react-native-google-cast](https://github.com/react-native-google-cast/react-native-google-cast)

Dúvida sobre o que você precisa para criar um Cast App? [App components](https://developers.google.com/cast/docs/developers#app_components)

Dúvida sobre mídias suportadas pelo Google Cast? [Supported Media](https://developers.google.com/cast/docs/media)

Dúvida sobre estilos do receiver? [Styled Media Receiver](https://developers.google.com/cast/docs/styled_receiver)

[Google Cast SDK Developer Console](https://cast.google.com/publish)
